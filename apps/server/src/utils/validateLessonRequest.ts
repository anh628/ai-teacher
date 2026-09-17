import type { LessonPlan, LessonPlanRequest } from "@ai-teacher/shared";

/**
 * Validates a lesson plan request
 * @param request The lesson plan request to validate
 * @returns True if the request is valid, false otherwise
 */
export function validateLessonRequest(
  request: unknown,
): request is LessonPlanRequest {
  if (typeof request !== "object" || request === null) {
    return false;
  }

  const { grade, subject, topic, objective } = request as Record<
    string,
    unknown
  >;

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
    isNotEmptyString(objective)
  );
}

/**
 * Validates a lesson plan
 * @param request the lesson plan to validate
 * @returns true if the request is valid, false otherwise
 */
export function validateLessonPlan(
  request: unknown,
): request is LessonPlan {
  if (typeof request !== "object" || request === null) {
    return false;
  }

  const { grade, subject, topic, objective, lessonTitle, activity, discussionQuestions, differentiation, assessment, generatedBy } = request as Record<
    string,
    unknown
  >;

  const { support, extension } = differentiation as Record<string, unknown>

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
    Array.isArray(discussionQuestions) && discussionQuestions.every(question => typeof question === "string" && isNotEmptyString(question)) &&
    typeof support === "string" &&
    isNotEmptyString(support) &&
    typeof extension === "string" &&
    isNotEmptyString(extension) &&
    typeof assessment === "string" &&
    isNotEmptyString(assessment) &&
    generatedBy === 'mock-ai'
  );
}

/**
 * check if a string is nonempty
 * @param s string to check
 * @returns return true if string is not empty, false otherwise
 */
function isNotEmptyString(s: string): boolean {
  return s.trim().length > 0
}