import type { Lesson } from "@ai-teacher/shared";
import { isNotEmptyString } from "./isNotEmptyString";

/**
 * Validates a lesson
 * @param request the lesson plan to validate
 * @returns true if the request is valid, false otherwise
 */
export function validateLesson(request: unknown): request is Lesson {
  if (typeof request !== "object" || request === null) {
    return false;
  }

  const {
    grade,
    subject,
    topic,
    objective,
    lessonTitle,
    activity,
    discussionQuestions,
    assessment,
    generatedBy,
    differentiation
  } = request as Record<string, unknown>;

  const { support, extension } = differentiation as Record<string, unknown>;

  return (
    typeof grade === "number" &&
    Number.isInteger(grade) &&
    grade >= 1 &&
    grade <= 12 &&
    typeof subject === "string" &&
    isNotEmptyString(subject) &&
    typeof topic === "string" &&
    isNotEmptyString(topic) &&
    typeof objective === "string" &&
    isNotEmptyString(objective) &&
    typeof lessonTitle === "string" &&
    isNotEmptyString(lessonTitle) &&
    typeof activity === "string" &&
    isNotEmptyString(activity) &&
    Array.isArray(discussionQuestions) &&
    discussionQuestions.every(
      (question) => typeof question === "string" && isNotEmptyString(question),
    ) &&
    typeof support === "string" &&
    isNotEmptyString(support) &&
    typeof extension === "string" &&
    isNotEmptyString(extension) &&
    typeof assessment === "string" &&
    isNotEmptyString(assessment) &&
    typeof generatedBy === "string"
  );
}
