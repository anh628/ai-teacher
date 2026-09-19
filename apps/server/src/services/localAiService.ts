import { validateGeneratedLesson } from "../utils/validateGeneratedLesson";
import type { Lesson, LessonRequest } from "@ai-teacher/shared";

import type { AIService } from "./aiService";

const OLLAMA_URL =
  process.env.OLLAMA_URL ?? "http://localhost:11434/api/generate";
const MODEL = "llama3";

async function requestOllama(prompt: string): Promise<string> {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
      format: "json",
    }),
  });

  if (!response.ok) {
    throw new Error("Local AI provider failed.");
  }

  const data = await response.json();

  return data.response;
}

export const localAIService: AIService = {
  async generateLesson(input: LessonRequest): Promise<Lesson> {
    const prompt = `
      Create a structured lesson plan using the following information:

      Grade: ${input.grade}
      Subject: ${input.subject}
      Topic: ${input.topic}
      Objective: ${input.objective}

      Return ONLY valid JSON with this exact structure:

      {
        "lessonTitle": "string",
        "activity": "string",
        "discussionQuestions": ["string", "string", "string"],
        "support": "string",
        "extension": "string",
        "assessment": "string",
      }

      Do not include markdown or any text outside the JSON.
      `;
    try {
      const response = await requestOllama(prompt);

      let generated: unknown;

      try {
        generated = JSON.parse(response);
      } catch {
        throw new Error("Local AI returned invalid JSON.");
      }

      if (!validateGeneratedLesson(generated)) {
        throw new Error("Local AI returned an invalid lesson.");
      }

      return {
        grade: input.grade,
        subject: input.subject,
        topic: input.topic,
        objective: input.objective,
        lessonTitle: generated.lessonTitle,
        activity: generated.activity,
        discussionQuestions: generated.discussionQuestions,
        differentiation: {
          support: generated.support,
          extension: generated.extension,
        },
        assessment: generated.assessment,
        generatedBy: "ollama",
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Unable to generate lesson with local AI.");
    }
  },
};
