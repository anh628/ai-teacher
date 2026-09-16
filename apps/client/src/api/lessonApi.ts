import type {LessonPlanRequest, LessonPlan} from "@ai-teacher/shared";

const API_URL = import.meta.env.VITE_API_URL

export async function generateLessonPlan(request: LessonPlanRequest): Promise<LessonPlan> {
  const response = await fetch(`${API_URL}/api/lessons/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to generate lesson plan");
  }

  return response.json();
}