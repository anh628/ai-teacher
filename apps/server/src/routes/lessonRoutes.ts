import { validateLesson, validateLessonRequest } from "../utils/validateLessonRequest";
import { generate } from "../services/mockAiServices";
import { saveLesson } from "../db/lessonRepository";
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
router.post("/save", async (req: Request, res:Response) => {
  if (!validateLesson(req.body)) {
    return res.status(400).json({
      error: "Unable to save lesson to database. Invalid lesson"
    })
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

export default router;
