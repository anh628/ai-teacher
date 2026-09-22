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
        setError(null);

        const data = await getAllLessons();
        setLessons(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to get lessons history. Please try again.",
        );
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
      <div className="history-header">
          <h2>Lesson History</h2>
      </div>

      <div className="history-meta">
        <small>
         Saved {lessons.length === 1 ? "lesson" : "lessons"} : {lessons.length} 
        </small>
      </div>

      {lessons.length === 0 ? (
        <div className="empty-page">
          <p>No saved lessons yet.</p>
          <p>Generate a lesson and save it to see it here.</p>
        </div>
      ) : (
        <ul className="lesson-history-list">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link to={`/history/${lesson.id}`}>
                <div className="history-card-header">
                  <h3>{lesson.lessonTitle}</h3>
                </div>

                <div className="history-card-meta">
                  <span>Grade {lesson.grade}</span>
                  <span>{lesson.subject}</span>
                  <span>{lesson.topic}</span>
                </div>

                <small>
                  Saved {new Date(lesson.createdAt).toLocaleString()}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
