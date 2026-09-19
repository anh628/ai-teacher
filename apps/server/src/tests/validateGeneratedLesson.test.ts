import { test } from "node:test";
import assert from "node:assert/strict";

import { validateGeneratedLesson } from "../utils/validateGeneratedLesson";
import { TEST_INVALID_LESSON, TEST_VALID_GENERATED_LESSON } from "./constants";

test("accepts a valid generated lesson", () => {
  assert.equal(validateGeneratedLesson(TEST_VALID_GENERATED_LESSON), true);
});

test("rejects a generated lesson with missing content", () => {
  assert.equal(validateGeneratedLesson(TEST_INVALID_LESSON), false);
});

test("rejects a non-object response", () => {
  assert.equal(validateGeneratedLesson("not a lesson"), false);
});

test("rejects invalid discussion questions", () => {
  const generatedLesson = {
    ...TEST_VALID_GENERATED_LESSON,
    discussionQuestions: ["What is an ecosystem?", 42],
  };
  assert.equal(validateGeneratedLesson(generatedLesson), false);
});
