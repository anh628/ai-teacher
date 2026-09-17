import LessonDisplay from "../components/LessonDisplay";
import type { Lesson } from "@ai-teacher/shared";

type LessonDisplayProps = {
  lesson: Lesson | null;
  setError: (message: string) => void;
};

export default function LessonPage({ lesson, setError }: LessonDisplayProps) {
  return lesson ? (
    <LessonDisplay lesson={lesson} setError={setError} />
  ) : (
    <section className="lesson">
      <h2>No Lesson Available</h2>
      <p>Generate a lesson first to view it here.</p>
    </section>
  );
}
