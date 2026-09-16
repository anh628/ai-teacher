import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { generate } from "../services/mockAiServices";

describe("generate", () => {
  it("generates a lesson with the provided input", () => {
    const lesson = generate({
      grade: 4,
      subject: "Science",
      topic: "The Water Cycle",
      objective: "Students will explain the main stages.",
    });

    assert.equal(lesson.grade, 4);
    assert.equal(lesson.subject, "Science");
    assert.equal(lesson.topic, "The Water Cycle");
    assert.equal(
      lesson.objective,
      "Students will explain the main stages."
    );
    assert.equal(lesson.generatedBy, "mock-ai");
  });

  it("generates subject-specific math content", () => {
    const lesson = generate({
      grade: 5,
      subject: "Math",
      topic: "Fractions",
      objective: "Students will compare fractions.",
    });

    assert.match(lesson.activity, /Fractions/);
    assert.match(lesson.assessment, /Fractions/);
  });

  it("generates different content for different grade levels", () => {
    const elementaryLesson = generate({
      grade: 3,
      subject: "Science",
      topic: "Plants",
      objective: "Students will describe how plants grow.",
    });

    const highSchoolLesson = generate({
      grade: 11,
      subject: "Science",
      topic: "Plants",
      objective: "Students will describe how plants grow.",
    });

    assert.notEqual(
      elementaryLesson.activity,
      highSchoolLesson.activity
    );
  });
});