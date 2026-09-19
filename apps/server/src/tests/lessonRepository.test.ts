import { test, after } from "node:test";
import assert from "node:assert/strict";

import { pool } from "../db/index";
import { getLessonById, saveLesson } from "../db/lessonRepository";
import { TEST_VALID_LESSON } from "./constants";

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
  const savedLesson = await saveLesson(TEST_VALID_LESSON);

  assert.ok(savedLesson.id);
  assert.equal(savedLesson.grade, TEST_VALID_LESSON.grade);
  assert.equal(savedLesson.subject, TEST_VALID_LESSON.subject);
  assert.equal(savedLesson.topic, TEST_VALID_LESSON.topic);
  assert.equal(savedLesson.objective, TEST_VALID_LESSON.objective);
  assert.equal(savedLesson.lessonTitle, TEST_VALID_LESSON.lessonTitle);
  assert.equal(savedLesson.generatedBy, TEST_VALID_LESSON.generatedBy);
  assert.ok(savedLesson.createdAt);
});