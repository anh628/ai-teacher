import { test } from "node:test";
import assert from "node:assert/strict";

import { aiService } from "../services";
import { TEST_VALID_INPUT } from "./constants";

test("AI service uses the configured provider", async () => {
  const lesson = await aiService.generateLesson(TEST_VALID_INPUT);

  assert.equal(lesson.generatedBy, "mock-ai");
});