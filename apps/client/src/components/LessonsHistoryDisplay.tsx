import type { SavedLesson } from "@ai-teacher/shared";
import { getAllLessons } from "../api/lessonApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type LessonHistoryProps = {
  setError: (message: string) => void;
};

export default function LessonsHistoryDisplay({
  setError,
}: LessonHistoryProps) {
  const [lessons, setLessons] = useState<SavedLesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLessons() {
      try {
        setError("");

        const data = await getAllLessons();
        setLessons(data);
      } catch (error) {
        setError(`Unable to load lessons history. ${error}`);
      } finally {
        setLoading(false);
      }
    }

    loadLessons();
  }, [setError]);

  if (loading) {
    return <p>Loading lessons history...</p>;
  }

  return (
    <section className="lesson-history">
      <h2>Lessons History</h2>

      {lessons.length === 0 ? (
        <p>No saved lessons yet.</p>
      ) : (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link to={`/history/${lesson.id}`} >
                <h3>{lesson.lessonTitle}</h3>

                <p>
                  <strong>Grade:</strong> {lesson.grade}
                </p>

                <p>
                  <strong>Subject:</strong> {lesson.subject}
                </p>

                <p>
                  <strong>Topic:</strong> {lesson.topic}
                </p>

                <small>
                  Saved: {new Date(lesson.createdAt).toLocaleString()}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
