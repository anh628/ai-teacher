import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateLessonRequest } from "../utils/validateLessonRequest";

describe("validateLessonRequest", () => {
  it("accepts a valid lesson request", () => {
    const input = {
      grade: 4,
      subject: "Science",
      topic: "The Water Cycle",
      objective: "Students will explain the water cycle.",
    };

    assert.equal(validateLessonRequest(input), true);
  });

  it("rejects missing fields", () => {
    assert.equal(validateLessonRequest({}), false);
  });

  it("rejects an invalid grade", () => {
    const input = {
      grade: 13,
      subject: "Science",
      topic: "The Water Cycle",
      objective: "Students will explain the water cycle.",
    };

    assert.equal(validateLessonRequest(input), false);
  });

  it("rejects an invalid grade type", () => {
    const input = {
      grade: "four",
      subject: "Science",
      topic: "The Water Cycle",
      objective: "Students will explain the water cycle.",
    };

    assert.equal(validateLessonRequest(input), false);
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