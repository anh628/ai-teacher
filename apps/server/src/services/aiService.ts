import type { Lesson, LessonRequest } from "@ai-teacher/shared";

export interface AIService {
  generateLesson(input: LessonRequest): Promise<Lesson>;
}