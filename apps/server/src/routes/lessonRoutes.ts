import { Router, Request, Response } from "express";
import { generate } from "../services/mockAiServices";
import { validateLessonRequest } from "../utils/validateLessonRequest";
const router = Router();

/**
 * @route POST /api/lessons/generate
 * @desc Generate a lesson plan based on the provided input parameters.
 * @access Public
 */
router.post("/generate", (req: Request, res: Response) => {
  const { grade, subject, topic, objective } = req.body;

  if (!validateLessonRequest({ grade, subject, topic, objective })) {
    return res.status(400).json({
      error:
        "Invalid lesson plan request. Please ensure that grade is an integer between 1 and 12, and subject, topic, and objective are non-empty strings.",
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
    res.status(500).json({ error: "Failed to generate lesson plan" });
  }
});

export default router;
