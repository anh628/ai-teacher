import LessonsHistoryDisplay from "./components/LessonsHistoryDisplay";
import GenerateLessonPage from "./pages/GenerateLessonPage";
import LessonDisplay from "./components/LessonDisplay";
import type { Lesson } from "@ai-teacher/shared";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import LessonDetailsPage from "./pages/LessonDetailsPage";

function AppContent() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  function handleLessonGenerated(lesson: Lesson) {
    setLesson(lesson);
    navigate("/lesson");
  }

  return (
    <div className="app">
      <header>
        <h1>AI Classroom Assistant</h1>

        <nav>
          <Link to="/">Generate Lesson </Link>
          {" | "}
          <Link to="/history">Lessons History</Link>
        </nav>
      </header>

      {error && <p className="error">{error}</p>}

      <Routes>
        <Route
          path="/"
          element={
            <GenerateLessonPage
              onLessonGenerated={handleLessonGenerated}
              setError={setError}
            />
          }
        />
        <Route
          path="/lesson"
          element={<LessonDisplay lesson={lesson} setError={setError} />}
        />
        <Route path="/history" element={<LessonsHistoryDisplay setError={setError}/>} />
        <Route path="/history/:id" element={<LessonDetailsPage setError={setError}/>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
