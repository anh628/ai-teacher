import LessonRequestForm from "./components/LessonRequestForm";
import LessonDisplay from "./components/LessonDisplay";

import type { Lesson } from "@ai-teacher/shared";
import { generateLesson } from "./api/lessonApi";
import { useState } from "react";

import "./App.css";

function App() {
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [objective, setObjective] = useState<string>("");

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setLesson(null);

    try {
      const lesson = await generateLesson({
        grade: Number(grade),
        subject,
        topic,
        objective,
      });
      setLesson(lesson);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <header>
        <h1>AI Classroom Assistant</h1>
        <p>Generate a structured lesson  from a few simple inputs.</p>
      </header>

      {!lesson && (
        <LessonRequestForm
          handleSubmit={handleSubmit}
          loading={loading}
          setGrade={setGrade}
          setSubject={setSubject}
          setTopic={setTopic}
          setObjective={setObjective}
          grade={grade}
          subject={subject}
          topic={topic}
          objective={objective}
        />
      )}

      {error && <p className="error">{error}</p>}

      {lesson && <LessonDisplay lesson={lesson} setError={setError}/>}
    </main>
  );
}

export default App;
