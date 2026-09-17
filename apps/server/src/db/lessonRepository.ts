import { pool } from "./index";
import type { Lesson } from "@ai-teacher/shared";

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
    discussionQuestions: row.discussio_questions,
    differntiation: { support: row.support, extension: row.extension },
    assessment: row.assessment,
    generatedBy: row.generatedBy,
    createdAt: row.created_at,
  };
}
