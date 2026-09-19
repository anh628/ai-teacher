import type { Lesson, LessonRequest } from "@ai-teacher/shared";
import type { AIService } from "./aiService";

export const localAIService: AIService = {
  async generateLesson(input: LessonRequest): Promise<Lesson> {
    throw new Error(
      `Local AI provider is not implemented yet for ${input.subject}.`,
    );
  },
};