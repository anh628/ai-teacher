import React from 'react'

type LessonPlanRequestFormProps = {
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  loading: boolean;
  setGrade: (grade: string) => void;
  setSubject: (subject: string) => void;
  setTopic: (topic: string) => void;
  setObjective: (objective: string) => void;
  grade: string;
  subject: string;
  topic: string;
  objective: string;
};

export default function LessonPlanRequestForm({
  handleSubmit,
  loading,
  setGrade,
  setSubject,
  setTopic,
  setObjective,
  grade,
  subject,
  topic,
  objective,
}: LessonPlanRequestFormProps) {
  return (
    <section className="form-section">
      <form onSubmit={handleSubmit}>
        <label>
          Grade
          <input
            id="grade"
            type="number"
            min="1"
            max="12"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
            placeholder="5"
            required
            inputMode="numeric"
            step="1"
          />
        </label>

        <label>
          Subject
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Science"
            required
          />
        </label>

        <label>
          Topic
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="The Water Cycle"
            required
          />
        </label>

        <label>
          Learning Goal
          <textarea
            id="objective"
            value={objective}
            onChange={(event) => setObjective(event.target.value)}
            placeholder="Students will be able to explain the main stages of the water cycle."
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Lesson"}
        </button>
      </form>
    </section>
  );
}
