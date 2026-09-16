import cors from "cors";
import express from "express";
import type { LessonPlanRequest } from "@ai-teacher/shared";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "AI Teacher server is running",
  });
});

app.post("/api/lesson-plans", (req, res) => {
  const lessonRequest: LessonPlanRequest = req.body;

  console.log("Lesson plan request:", lessonRequest);

  res.json({
    message: "Lesson plan request received",
    data: lessonRequest,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});