import type { LessonPlanRequest } from "@ai-teacher/shared";

/**
 * Validates a lesson plan request
 * @param request The lesson plan request to validate
 * @returns True if the request is valid, false otherwise
 */
export function validateLessonRequest(
  request: LessonPlanRequest,
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
    subject.trim().length > 0 &&
    typeof topic === "string" &&
    topic.trim().length > 0 &&
    typeof objective === "string" &&
    objective.trim().length > 0
  );
}
