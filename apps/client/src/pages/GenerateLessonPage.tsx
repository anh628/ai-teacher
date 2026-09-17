import type { Lesson } from "@ai-teacher/shared";
import { generateLesson } from "../api/lessonApi";
import { useState } from "react";

type GenerateLessonPageProps = {
  onLessonGenerated: (lesson: Lesson) => void;
  setError: (message: string) => void;
};

export default function GenerateLessonPage({
  onLessonGenerated,
  setError,
}: GenerateLessonPageProps) {
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [objective, setObjective] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const lesson = await generateLesson({
        grade: Number(grade),
        subject,
        topic,
        objective,
      });

      onLessonGenerated(lesson);
    } catch (error) {
      setError(
        "Unable to generate the lesson. Make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-section">
      <h2>Generate a Lesson</h2>

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
