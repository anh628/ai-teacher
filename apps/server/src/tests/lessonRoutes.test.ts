import { test, after } from "node:test";
import assert from "node:assert/strict";

import { pool } from "../db/index";

const API_URL = "http://localhost:3001";

test("POST /api/lessons/save saves a lesson", async () => {
  const lesson = {
    grade: 3,
    subject: "Science",
    topic: "Animal Habitats",
    objective: "Students will identify how animals use their habitats.",
    lessonTitle: "Exploring Animal Habitats",
    activity:
      "Have students match animals with the habitats where they live.",
    discussionQuestions: [
      "What is a habitat?",
      "Why do animals need specific habitats?",
      "How does a habitat help an animal survive?",
    ],
    differentiation: {
      support:
        "Provide animal and habitat picture cards.",
      extension:
        "Ask students to explain how an animal's features help it live in its habitat.",
    },
    assessment:
      "Ask students to identify an animal's habitat and explain why it is suitable.",
    generatedBy: "mock-ai",
  };

  const response = await fetch(`${API_URL}/api/lessons/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lesson),
  });

  assert.equal(response.status, 201);

  const savedLesson = await response.json();

  assert.ok(savedLesson.id);
  assert.equal(savedLesson.subject, lesson.subject);
  assert.equal(savedLesson.topic, lesson.topic);
  assert.equal(savedLesson.generatedBy, lesson.generatedBy);
  assert.ok(savedLesson.createdAt);
});

test("POST /api/lessons/save rejects an invalid grade", async () => {
  const lesson = {
    grade: 0,
    subject: "Science",
    topic: "Animal Habitats",
    objective: "Students will identify how animals use their habitats.",
    lessonTitle: "Exploring Animal Habitats",
    activity:
      "Have students match animals with the habitats where they live.",
    discussionQuestions: [
      "What is a habitat?",
      "Why do animals need specific habitats?",
      "How does a habitat help an animal survive?",
    ],
    differentiation: {
      support:
        "Provide animal and habitat picture cards.",
      extension:
        "Ask students to explain how an animal's features help it live in its habitat.",
    },
    assessment:
      "Ask students to identify an animal's habitat and explain why it is suitable.",
    generatedBy: "mock-ai",
  };


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
  const lesson = {
    grade: 0,
    subject: "Science",
    topic: "Animal Habitats",
    objective: "Students will identify how animals use their habitats.",
  };


  const response = await fetch(`${API_URL}/api/lessons/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lesson),
  });

  assert.equal(response.status, 500);
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