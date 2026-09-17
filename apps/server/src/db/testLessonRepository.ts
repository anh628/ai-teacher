import { pool } from "./index";
import { saveLesson } from "./lessonRepository";

async function testSaveLesson() {
  try {
    const lesson = {
      grade: 4,
      subject: "Science",
      topic: "The Water Cycle",
      objective: "Students will explain the main stages of the water cycle.",
      lessonTitle: "The Water Cycle: Understanding the Key Ideas",
      activity:
        "Have students explore the water cycle through a hands-on activity or observation.",
      discussionQuestions: [
        "What do you already know about the water cycle?",
        "What evidence can help us understand the water cycle?",
        "How would you explain what you learned about the water cycle?",
      ],
      differentiation: {
        support:
          "Provide visual examples, vocabulary support, and sentence starters.",
        extension:
          "Ask students to create their own example and explain it to a classmate.",
      },
      assessment:
        "Ask students to complete a short explanation showing what they learned about the water cycle.",
      generatedBy: "mock-ai",
    };

    const savedLesson = await saveLesson(lesson);

    console.log("Lesson saved:", savedLesson);
  } catch (error) {
    console.error("Failed to save lesson:", error);
  } finally {
    await pool.end();
  }
}

testSaveLesson();