import { test } from "node:test";
import assert from "node:assert/strict";

import { localAIService } from "../services/localAiService";
import { TEST_VALID_INPUT } from "./constants";

// only run test if RUN_OLLAMA_TESTS is true
test("local AI service generates a lesson with Ollama", async (t) => {
  if (process.env.RUN_OLLAMA_TESTS !== "true") {
    t.skip("Ollama integration tests are disabled");
  }
  const generatedLesson = await localAIService.generateLesson(TEST_VALID_INPUT);

  assert.equal(generatedLesson.grade, TEST_VALID_INPUT.grade);
  assert.equal(generatedLesson.subject, TEST_VALID_INPUT.subject);
  assert.equal(generatedLesson.topic, TEST_VALID_INPUT.topic);
  assert.equal(generatedLesson.objective, TEST_VALID_INPUT.objective);

  assert.ok(generatedLesson.lessonTitle);
  assert.ok(generatedLesson.activity);
  assert.ok(generatedLesson.discussionQuestions.length > 0);
  assert.ok(generatedLesson.differentiation.support);
  assert.ok(generatedLesson.differentiation.extension);
  assert.ok(generatedLesson.assessment);
  assert.equal(generatedLesson.generatedBy, "ollama");
});
