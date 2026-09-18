import type { LessonRequest, Lesson, SavedLesson } from "@ai-teacher/shared";

const API_URL = import.meta.env.VITE_API_URL;

export async function generateLesson(request: LessonRequest): Promise<Lesson> {
  const response = await fetch(`${API_URL}/api/lessons/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to generate lesson, check inputs");
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
    throw new Error("Failed to save lesson");
  }

  return response.json();
}

export async function getAllLessons(): Promise<SavedLesson[]> {
  const response = await fetch(`${API_URL}/api/lessons`);

  if (!response.ok) {
    throw new Error("Failed to retrieve lessons.");
  }

  return response.json();
}

export async function getLessonById(id: number): Promise<SavedLesson> {
  const response = await fetch(`${API_URL}/api/lessons/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Lesson not found.");
    }

    if (response.status === 400) {
      throw new Error("Invalid lesson ID.");
    }

    throw new Error("Unable to retrieve lesson.");
  }
  return response.json();
}
