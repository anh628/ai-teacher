export type LessonPlanRequest = {
  grade: number;
  subject: string;
  topic: string;
  objective: string;
};

export type LessonPlan = {
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

export interface SavedLessonPlan extends LessonPlan {
  id: number;
  generatedBy: string;
};
