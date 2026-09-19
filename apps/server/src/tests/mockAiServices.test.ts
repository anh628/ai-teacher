import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { aiService } from "../services";
import { TEST_VALID_INPUT } from "./constants";

describe("AI service generating a structure lesson", () => {
  it("generates a lesson with the provided input", async () => {
    const lesson = await aiService.generateLesson(TEST_VALID_INPUT);

    assert.equal(lesson.grade, TEST_VALID_INPUT.grade);
    assert.equal(lesson.subject, TEST_VALID_INPUT.subject);
    assert.equal(lesson.topic, TEST_VALID_INPUT.topic);
    assert.equal(lesson.objective, TEST_VALID_INPUT.objective);
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
      ...TEST_VALID_INPUT,
      grade: 3,
    });

    const highSchoolLesson = await aiService.generateLesson({
      ...TEST_VALID_INPUT,
      grade: 11,
    });

    assert.notEqual(elementaryLesson.activity, highSchoolLesson.activity);
  });
});
