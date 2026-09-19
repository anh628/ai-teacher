import { test, after } from "node:test";
import assert from "node:assert/strict";

import { pool } from "../db/index";
import { TEST_INVALID_LESSON, TEST_VALID_LESSON } from "./constants";

const API_URL = "http://localhost:3001";

test("POST /api/lessons/save saves a lesson", async () => {
  const response = await fetch(`${API_URL}/api/lessons/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(TEST_VALID_LESSON),
  });

  assert.equal(response.status, 201);

  const savedLesson = await response.json();

  assert.ok(savedLesson.id);
  assert.equal(savedLesson.subject, TEST_VALID_LESSON.subject);
  assert.equal(savedLesson.topic, TEST_VALID_LESSON.topic);
  assert.equal(savedLesson.generatedBy, TEST_VALID_LESSON.generatedBy);
  assert.ok(savedLesson.createdAt);
});

test("POST /api/lessons/save rejects an invalid grade", async () => {
  const lesson = { ...TEST_VALID_LESSON, grade: 0 };

  const response = await fetch(`${API_URL}/api/lessons/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lesson),
  });

  assert.equal(response.status, 400);
});

test("POST /api/lessons/save rejects missing lesson data", async () => {
  const response = await fetch(`${API_URL}/api/lessons/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(TEST_INVALID_LESSON),
  });

  assert.equal(response.status, 400);
});

test("GET /api/lessons returns saved lessons", async () => {
  const response = await fetch(`${API_URL}/api/lessons`);

  assert.equal(response.status, 200);

  const lessons = await response.json();

  assert.ok(Array.isArray(lessons));
});

test("GET /api/lessons/:id returns a saved lesson", async () => {
  const response = await fetch(`${API_URL}/api/lessons/1`);

  assert.equal(response.status, 200);

  const lesson = await response.json();

  assert.equal(lesson.id, 1);
});

test("GET /api/lessons/:id returns 404 for a missing lesson", async () => {
  const response = await fetch(`${API_URL}/api/lessons/999999`);

  assert.equal(response.status, 404);
});

test("GET /api/lessons/:id returns 400 for an invalid ID", async () => {
  const response = await fetch(`${API_URL}/api/lessons/not-a-number`);

  assert.equal(response.status, 400);
});

after(async () => {
  await pool.end();
});
