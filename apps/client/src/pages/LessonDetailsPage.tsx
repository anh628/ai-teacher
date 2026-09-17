import LessonDisplay from "../components/LessonDisplay";
import type { SavedLesson } from "@ai-teacher/shared";
import { getLessonById } from "../api/lessonApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type LessonDetailsPageProps = {
  setError: (message: string) => void;
};

export default function LessonDetailsPage({
  setError,
}: LessonDetailsPageProps) {
  const { id } = useParams<{ id: string }>();

  const [lesson, setLesson] = useState<SavedLesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLesson() {
      if (!id) {
        setError("Lesson ID is missing.");
        setLoading(false);
        return;
      }
      try {
        setError("");
        const data = await getLessonById(Number(id));
        setLesson(data);
      } catch (error) {
        setError(`Unable to load lesson. ${error}`);
      } finally {
        setLoading(false);
      }
    }
    loadLesson();
  }, [id, setError]);

  if (loading) {
    return <p>Loading lesson...</p>;
  }
  if (!lesson) {
    return (
      <section className="lesson">
        <h2>Lesson Not Found</h2>
        <p> The requested lesson could not be found. </p>
      </section>
    );
  }
  return <LessonDisplay lesson={lesson} setError={setError} />;
}
