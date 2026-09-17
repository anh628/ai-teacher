import {
  validateLesson,
  validateLessonRequest,
} from "../utils/validateLessonRequest";
import { generate } from "../services/mockAiServices";
import {
  getAllLessons,
  getLessonById,
  saveLesson,
} from "../db/lessonRepository";
import { Router, Request, Response } from "express";
const router = Router();

/**
 * @route POST /api/lessons/generate
 * @desc Generate a lesson based on the provided input parameters.
 * @access Public
 */
router.post("/generate", (req: Request, res: Response) => {
  const { grade, subject, topic, objective } = req.body;

  if (!validateLessonRequest({ grade, subject, topic, objective })) {
    return res.status(400).json({
      error:
        "Invalid lesson request. Please ensure that grade is an integer between 1 and 12, and subject, topic, and objective are non-empty strings.",
    });
  }
  try {
    const lesson = generate({
      grade,
      subject: subject.trim(),
      topic: topic.trim(),
      objective: objective.trim(),
    });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/**
 * @route POST /api/lessons/save
 * @desc save the lesson to ai_teacher database
 */
router.post("/save", async (req: Request, res: Response) => {
  if (!validateLesson(req.body)) {
    return res.status(400).json({
      error: "Unable to save lesson to database. Invalid lesson plan.",
    });
  }
  try {
    const savedLesson = await saveLesson(req.body);

    return res.status(201).json(savedLesson);
  } catch (error) {
    console.error("Failed to save lesson:", error);

    return res.status(500).json({
      error: "Failed to save lesson",
    });
  }
});

/**
 * @route GET /api/lessons
 * @desc get all lessons in ai_teacher database
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const lesson = await getAllLessons();
    return res.json(lesson);
  } catch (error) {
    console.error("Failed to retrieve lessons:", error);
    return res.status(500).json({
      error: "Failed to retrieve lessons.",
    });
  }
});

/**
 * @route GET /api/lessons/id
 * @desc get lesson with id in ai_teacher database
 */
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid lesson ID",
    });
  }

  try {
    const lesson = await getLessonById(id);

    if (!lesson) {
      return res.status(404).json({
        error: "Lesson not found",
      });
    }

    return res.json(lesson);
  } catch (error) {
    console.error("Failed to retrieve lesson:", error);

    return res.status(500).json({
      error: "Failed to retrieve lesson",
    });
  }
});

export default router;
