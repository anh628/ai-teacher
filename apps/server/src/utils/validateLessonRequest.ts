import type { LessonRequest } from "@ai-teacher/shared";
import { isNotEmptyString } from "./isNotEmptyString";

/**
 * Validates a lesson request
 * @param request The lesson request to validate
 * @returns True if the request is valid, false otherwise
 */
export function validateLessonRequest(
  request: unknown,
): request is LessonRequest {
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
