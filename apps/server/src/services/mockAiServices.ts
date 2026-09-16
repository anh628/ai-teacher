import type { LessonPlanRequest, LessonPlan } from "@ai-teacher/shared";


/**
 * Generates a lesson plan based on the provided input parameters.
 * Mock an AI-generated lesson plan for the given grade, subject, topic, and objective.
 * @param grade - The grade level for which the lesson is intended.
 * @param subject - The subject area of the lesson.
 * @param topic - The specific topic to be covered in the lesson.
 * @param objective - The learning objective for the lesson.
 * @returns A LessonPlan object containing the generated lesson plan details.
 */
export function generate({
  grade,
  subject,
  topic,
  objective,
}: LessonPlanRequest): LessonPlan {
  const activities = [
    `Have students explore ${topic} through a short guided activity connected to ${objective}.`,
    `Engage students in a hands-on experiment related to ${topic} to reinforce the learning goal of ${objective}.`,
    `Facilitate a group discussion on ${topic}, encouraging students to connect it to ${objective}.`,
    `Ask students to work in pairs to investigate ${topic} and explain their reasoning to a partner.`,
  ];

  const questions = [
    `What do you already know about ${topic}?`,
    `How would you explain ${topic} to another student?`,
    `What evidence could you use to support your understanding of ${topic}?`,
  ];

  const randomActivity =
    activities[Math.floor(Math.random() * activities.length)];

  return {
    grade,
    subject,
    topic,
    objective,
    lessonTitle: `Lesson: ${topic}`,
    activity: randomActivity,
    discussionQuestions: questions,
    differentiation: {
      support: `Provide visual examples and sentence starters to help students explain ${topic}.`,
      extension: `Ask students to apply their understanding of ${topic} to a new example or situation.`,
    },
    assessment: `Evaluate student understanding of ${topic} through a short quiz or exit ticket.`,
    generatedBy: "mock-ai",
  };
}
