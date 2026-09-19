import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { aiService } from "../services";

describe("AI service generating a structure lesson", () => {
  it("generates a lesson with the provided input", async () => {
    const lesson = await aiService.generateLesson({
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

  it("generates subject-specific math content", async () => {
    const lesson = await aiService.generateLesson({
      grade: 5,
      subject: "Math",
      topic: "Fractions",
      objective: "Students will compare fractions.",
    });

    assert.match(lesson.activity, /Fractions/);
    assert.match(lesson.assessment, /Fractions/);
  });

  it("generates different content for different grade levels", async () => {
    const elementaryLesson = await aiService.generateLesson({
      grade: 3,
      subject: "Science",
      topic: "Plants",
      objective: "Students will describe how plants grow.",
    });

    const highSchoolLesson = await aiService.generateLesson({
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