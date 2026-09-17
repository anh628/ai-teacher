import type {LessonRequest, Lesson, SavedLesson} from "@ai-teacher/shared";

const API_URL = import.meta.env.VITE_API_URL

export async function generateLesson(request: LessonRequest): Promise<Lesson> {
  const response = await fetch(`${API_URL}/api/lessons/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to generate lesson plan, check inputs");
  }

  return response.json();
}

export async function saveLesson(request: Lesson): Promise<SavedLesson> {
  const response = await fetch(`${API_URL}/api/lessons/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to save lesson plan");
  }

  return response.json();
}