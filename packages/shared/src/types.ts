export type LessonRequest = {
  grade: number;
  subject: string;
  topic: string;
  objective: string;
};

export type Lesson = {
  grade: number;
  subject: string;
  topic: string;
  objective: string;
  lessonTitle: string;
  activity: string;
  discussionQuestions: string[];
  differentiation: {
    support: string;
    extension: string;
  };
  assessment: string;
  generatedBy: string;
};

export interface SavedLesson extends Lesson {
  id: number;
  createdAt: string;
};
