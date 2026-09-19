import { test } from "node:test";
import assert from "node:assert/strict";

import { aiService } from "../services";

test("AI service uses the configured provider", async () => {
  const lesson = await aiService.generateLesson({
    grade: 4,
    subject: "Science",
    topic: "The Water Cycle",
    objective: "Students will explain the main stages of the water cycle.",
  });

  assert.equal(lesson.generatedBy, "mock-ai");
});