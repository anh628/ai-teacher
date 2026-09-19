import type { LessonRequest, Lesson } from "@ai-teacher/shared";
import type { AIService } from "./aiService";

export const mockAIService: AIService = {

  async generateLesson(input: LessonRequest): Promise<Lesson> {
    const { grade, subject, topic, objective } = input;
    return {
      grade,
      subject,
      topic,
      objective,
      lessonTitle: `Lesson: ${topic}`,
      activity: getActivity(
        getGradeLevel(grade),
        normalizeSubject(subject),
        topic,
        objective,
      ),
      discussionQuestions: getDiscussionQuestions(
        getGradeLevel(grade),
        normalizeSubject(subject),
        topic,
      ),
      differentiation: getDifferentiation(topic, getGradeLevel(grade)),
      assessment: getAssessment(normalizeSubject(subject), topic),
      generatedBy: "mock-ai",
    };
  },
};


/**
 * Normalizes the subject string to lowercase for consistent processing.
 * @param subject
 * @returns string - The normalized subject string in lowercase.
 */
function normalizeSubject(subject: string): string {
  return subject.toLowerCase();
}

/**
 * Determine the grade level category based on the provided grade number.
 * @param grade
 * @returns grade level category as a string ('elementary', 'middle', or 'high').
 */
function getGradeLevel(grade: number): "elementary" | "middle" | "high" {
  if (grade >= 1 && grade <= 5) {
    return "elementary";
  } else if (grade >= 6 && grade <= 8) {
    return "middle";
  } else {
    return "high";
  }
}

/**
 * Generates an activity based on the grade level, subject, topic, and objective.
 * @param gradeLevel
 * @param subject
 * @param topic
 * @param objective
 */
function getActivity(
  gradeLevel: "elementary" | "middle" | "high",
  subject: string,
  topic: string,
  objective: string,
): string {
  if (subject.includes("math")) {
    if (gradeLevel === "elementary") {
      return `Have students solve several ${topic} problems using visual models or manipulatives. Ask them to explain their strategy to a partner.`;
    } else if (gradeLevel === "middle") {
      return `Have students work in pairs to solve ${topic} problems and compare different strategies. Ask them to justify why their approach works.`;
    } else {
      return `Have students analyze several ${topic} problems and compare different solution strategies. Ask them to justify their reasoning and connect it to the learning goal: ${objective}`;
    }
  }

  if (subject.includes("science")) {
    if (gradeLevel === "elementary") {
      return `Have students explore ${topic} through a hands-on activity or observation. Encourage them to draw and describe what they notice.`;
    } else if (gradeLevel === "middle") {
      return `Have students investigate ${topic} by collecting observations or evidence. Ask them to work in groups to explain what their evidence shows.`;
    } else {
      return `Have students investigate ${topic} using available evidence or data. Ask them to analyze their findings and explain how they support the learning goal.`;
    }
  }

  if (
    subject.includes("english") ||
    subject.includes("ela") ||
    subject.includes("language arts")
  ) {
    if (gradeLevel === "elementary") {
      return `Have students read a short text related to ${topic}. Ask them to identify important ideas and discuss them with a partner.`;
    } else if (gradeLevel === "middle") {
      return `Have students analyze a text related to ${topic} and identify evidence that supports their interpretation. Discuss their findings as a class.`;
    } else {
      return `Have students analyze a text related to ${topic}, evaluate relevant evidence, and develop a written response connected to the learning goal.`;
    }
  }

  return `Have students work in small groups to explore ${topic}. Ask them to discuss their ideas and create an explanation connected to the learning goal.`;
}

/**
 * Generates discussion questions based on the grade level, subject, and topic.
 * @param gradeLevel
 * @param subject
 * @param topic
 * @returns an array of discussion questions as strings.
 */
function getDiscussionQuestions(
  gradeLevel: "elementary" | "middle" | "high",
  subject: string,
  topic: string,
): string[] {
  if (subject.includes("math")) {
    return [
      `What strategy could you use to solve a problem involving ${topic}?`,
      `How can you check whether your answer is reasonable?`,
      gradeLevel === "elementary"
        ? `How would you explain your strategy to a classmate?`
        : `How can you compare two different approaches to ${topic}?`,
    ];
  }

  if (subject.includes("science")) {
    return [
      `What do you already know about ${topic}?`,
      `What evidence can help us understand ${topic}?`,
      `How would you explain what you learned about ${topic}?`,
    ];
  }

  if (
    subject.includes("english") ||
    subject.includes("ela") ||
    subject.includes("language arts")
  ) {
    return [
      `What is an important idea related to ${topic}?`,
      `What evidence supports your understanding of ${topic}?`,
      `What question do you still have about ${topic}?`,
    ];
  }

  return [
    `What do you already know about ${topic}?`,
    `What is one important idea you learned about ${topic}?`,
    `How could you explain ${topic} to another student?`,
  ];
}

/**
 * Generates an assessment prompt based on the subject and topic.
 * @param subject
 * @param topic
 * @returns string - An assessment prompt for students to demonstrate their understanding of the topic.
 */
function getAssessment(subject: string, topic: string): string {
  if (subject.includes("math")) {
    return `Give students a short set of ${topic} problems and ask them to explain their reasoning for at least one answer.`;
  }

  if (subject.includes("science")) {
    return `Ask students to complete a short explanation showing what they learned about ${topic}.`;
  }

  if (
    subject.includes("english") ||
    subject.includes("ela") ||
    subject.includes("language arts")
  ) {
    return `Ask students to write a short response using evidence to demonstrate their understanding of ${topic}.`;
  }

  return `Ask students to complete a short written response explaining what they learned about ${topic}.`;
}

/**
 * Generates differentiation strategies based on the topic and grade level.
 * @param topic
 * @param gradeLevel
 * @returns
 */
function getDifferentiation(
  topic: string,
  gradeLevel: "elementary" | "middle" | "high",
) {
  if (gradeLevel === "elementary") {
    return {
      support: `Provide visual examples, vocabulary support, and sentence starters to help students explain ${topic}.`,
      extension: `Ask students to create their own example of ${topic} and explain it to a classmate.`,
    };
  } else if (gradeLevel === "middle") {
    return {
      support: `Provide key vocabulary, worked examples, and guiding questions to support students learning ${topic}.`,
      extension: `Ask students to apply ${topic} to a new example and explain their reasoning.`,
    };
  } else {
    return {
      support: `Provide key vocabulary, background information, and guiding questions to support students learning ${topic}.`,
      extension: `Ask students to evaluate or apply their understanding of ${topic} in a new context.`,
    };
  }
}
