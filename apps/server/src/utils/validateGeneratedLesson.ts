import { isNotEmptyString } from "./isNotEmptyString";

/**
 * Validates the structure of a lesson returned by the AI provider.
 *
 * The AI response uses a flat structure for differentiation fields,
 * while the application's Lesson type nests those fields under
 * `differentiation`. This validation ensures the provider response
 * contains the required fields and expected value types before it is
 * converted into a Lesson.
 *
 * @param value - The unknown value returned by the AI provider.
 * @returns True when the value contains a valid generated lesson structure.
 */
export function validateGeneratedLesson(value: any): value is {
  lessonTitle: string;
  activity: string;
  discussionQuestions: string[];
  support: string;
  extension: string;
  assessment: string;
} {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const {
    lessonTitle,
    activity,
    discussionQuestions,
    support,
    extension,
    assessment,
  } = value as Record<string, unknown>;

  return (
    typeof lessonTitle === "string" &&
    isNotEmptyString(lessonTitle) &&
    typeof activity === "string" &&
    isNotEmptyString(activity) &&
    Array.isArray(discussionQuestions) &&
    discussionQuestions.length > 0 &&
    discussionQuestions.every(
      (question) => typeof question === "string" && isNotEmptyString(question),
    ) &&
    typeof support === "string" &&
    isNotEmptyString(support) &&
    typeof extension === "string" &&
    isNotEmptyString(extension) &&
    typeof assessment === "string" &&
    isNotEmptyString(assessment)
  );
}
