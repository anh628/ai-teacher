import { pool } from "./index";
import type { Lesson, SavedLesson } from "@ai-teacher/shared";

export async function saveLesson(lesson: Lesson) {
  const result = await pool.query(
    `
      INSERT INTO lessons (
        grade,
        subject,
        topic,
        objective,
        lesson_title,
        activity,
        discussion_questions,
        support,
        extension,
        assessment,
        generated_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING
        id,
        grade,
        subject,
        topic,
        objective,
        lesson_title,
        activity,
        discussion_questions,
        support,
        extension,
        assessment,
        generated_by,
        created_at
    `,
    [
      lesson.grade,
      lesson.subject,
      lesson.topic,
      lesson.objective,
      lesson.lessonTitle,
      lesson.activity,
      lesson.discussionQuestions,
      lesson.differentiation.support,
      lesson.differentiation.extension,
      lesson.assessment,
      lesson.generatedBy,
    ],
  );

  const row = result.rows[0];
  return {
    id: row.id,
    grade: row.grade,
    subject: row.subject,
    topic: row.topic,
    objective: row.objective,
    lessonTitle: row.lesson_title,
    activity: row.activity,
    discussionQuestions: row.discussion_questions,
    differentiation: { support: row.support, extension: row.extension },
    assessment: row.assessment,
    generatedBy: row.generated_by,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function getAllLessons(): Promise<SavedLesson[]> {
  const result = await pool.query(`
    SELECT
      id,
      grade,
      subject,
      topic,
      objective,
      lesson_title,
      activity,
      discussion_questions,
      support,
      extension,
      assessment,
      generated_by,
      created_at
    FROM lessons
    ORDER BY created_at DESC
    `);

  return result.rows.map((row) => ({
    id: row.id,
    grade: row.grade,
    subject: row.subject,
    topic: row.topic,
    objective: row.objective,
    lessonTitle: row.lesson_title,
    activity: row.activity,
    discussionQuestions: row.discussion_questions,
    differentiation: { support: row.support, extension: row.extension },
    assessment: row.assessment,
    generatedBy: row.generated_by,
    createdAt: new Date(row.created_at).toISOString(),
  }));
}

export async function getLessonById(id: number): Promise<SavedLesson | null> {
  const result = await pool.query(
    `
    SELECT
      id,
      grade,
      subject,
      topic,
      objective,
      lesson_title,
      activity,
      discussion_questions,
      support,
      extension,
      assessment,
      generated_by,
      created_at
    FROM lessons
    WHERE id = $1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    grade: row.grade,
    subject: row.subject,
    topic: row.topic,
    objective: row.objective,
    lessonTitle: row.lesson_title,
    activity: row.activity,
    discussionQuestions: row.discussion_questions,
    differentiation: { support: row.support, extension: row.extension },
    assessment: row.assessment,
    generatedBy: row.generated_by,
    createdAt: row.created_at,
  };
}
