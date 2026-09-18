import { test, after } from "node:test";
import assert from "node:assert/strict";

import { pool } from "../db/index";
import { getLessonById, saveLesson } from "../db/lessonRepository";

test("getLessonById returns a saved lesson", async () => {
  const lesson = await getLessonById(1);

  assert.ok(lesson);
  assert.equal(lesson.id, 1);
});

test("getLessonById returns null for a missing lesson", async () => {
  const lesson = await getLessonById(999999);

  assert.equal(lesson, null);
});

after(async () => {
  await pool.end();
});

test("saveLesson saves and returns a lesson", async () => {
  const lesson = {
    grade: 4,
    subject: "Science",
    topic: "Plant Life Cycles",
    objective: "Students will explain the main stages of a plant life cycle.",
    lessonTitle: "Understanding Plant Life Cycles",
    activity:
      "Have students observe and sequence the stages of a plant life cycle.",
    discussionQuestions: [
      "What are the main stages of a plant life cycle?",
      "What changes as a plant grows?",
      "How would you explain the life cycle to a classmate?",
    ],
    differentiation: {
      support:
        "Provide labeled diagrams and vocabulary support.",
      extension:
        "Ask students to create a diagram showing the plant life cycle.",
    },
    assessment:
      "Ask students to describe the stages of a plant life cycle in order.",
    generatedBy: "mock-ai",
  };

  const savedLesson = await saveLesson(lesson);

  assert.ok(savedLesson.id);
  assert.equal(savedLesson.grade, lesson.grade);
  assert.equal(savedLesson.subject, lesson.subject);
  assert.equal(savedLesson.topic, lesson.topic);
  assert.equal(savedLesson.objective, lesson.objective);
  assert.equal(savedLesson.lessonTitle, lesson.lessonTitle);
  assert.equal(savedLesson.generatedBy, lesson.generatedBy);
  assert.ok(savedLesson.createdAt);
});