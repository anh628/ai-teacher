import { Lesson } from "@ai-teacher/shared";

export const TEST_VALID_INPUT = {
  grade: 4,
  subject: "Science",
  topic: "The Water Cycle",
  objective: "Students will explain the main stages of the water cycle.",
};

export const TEST_INVALID_INPUT = {
  grade: 0,
  topic: "The Water Cycle",
  objective: "Students will explain the main stages of the water cycle.",
};

export const TEST_VALID_LESSON = {
  grade: 3,
  subject: "Science",
  topic: "Animal Habitats",
  objective: "Students will identify how animals use their habitats.",
  lessonTitle: "Exploring Animal Habitats",
  activity: "Have students match animals with the habitats where they live.",
  discussionQuestions: [
    "What is a habitat?",
    "Why do animals need specific habitats?",
    "How does a habitat help an animal survive?",
  ],
  differentiation: {
    support: "Provide animal and habitat picture cards.",
    extension:
      "Ask students to explain how an animal's features help it live in its habitat.",
  },
  assessment:
    "Ask students to identify an animal's habitat and explain why it is suitable.",
  generatedBy: "mock-ai",
};

export const TEST_INVALID_LESSON = {
  grade: 3,
  subject: "Science",
  topic: "Animal Habitats",
  objective: "Students will identify how animals use their habitats.",
  lessonTitle: "Exploring Animal Habitats",
  discussionQuestions: [
    "What is a habitat?",
    "Why do animals need specific habitats?",
    "How does a habitat help an animal survive?",
  ],
  differentiation: {
    support: "Provide animal and habitat picture cards.",
    extension:
      "Ask students to explain how an animal's features help it live in its habitat.",
  },
  assessment:
    "Ask students to identify an animal's habitat and explain why it is suitable.",
  generatedBy: "mock-ai",
};

export const TEST_VALID_GENERATED_LESSON = {
  grade: 3,
  subject: "Science",
  topic: "Animal Habitats",
  objective: "Students will identify how animals use their habitats.",
  lessonTitle: "Exploring Animal Habitats",
  activity: "Have students match animals with the habitats where they live.",
  discussionQuestions: [
    "What is a habitat?",
    "Why do animals need specific habitats?",
    "How does a habitat help an animal survive?",
  ],
  support: "Provide animal and habitat picture cards.",
  extension:
    "Ask students to explain how an animal's features help it live in its habitat.",
  assessment:
    "Ask students to identify an animal's habitat and explain why it is suitable.",
};
