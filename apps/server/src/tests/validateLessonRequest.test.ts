import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateLessonRequest } from "../utils/validateLessonRequest";
import { TEST_VALID_INPUT } from "./constants";

describe("validateLessonRequest", () => {
  it("accepts a valid lesson request", () => {
    assert.equal(validateLessonRequest(TEST_VALID_INPUT), true);
  });

  it("rejects missing fields", () => {
    assert.equal(validateLessonRequest({}), false);
  });

  it("rejects an invalid grade", () => {
    assert.equal(
      validateLessonRequest({ ...TEST_VALID_INPUT, grade: 13 }),
      false,
    );
  });

  it("rejects an invalid grade type", () => {
    assert.equal(
      validateLessonRequest({ ...TEST_VALID_INPUT, grade: "four" }),
      false,
    );
  });

  it("rejects empty strings", () => {
    const input = {
      grade: 4,
      subject: "",
      topic: "",
      objective: "",
    };

    assert.equal(validateLessonRequest(input), false);
  });
});
