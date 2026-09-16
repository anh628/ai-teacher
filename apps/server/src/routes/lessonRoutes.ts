import { Router, Request, Response } from "express";
import { generate } from '../services/mockAiServices'
const router = Router();

/**
 * @route POST /api/lessons/generate
 * @desc Generate a lesson plan based on the provided input parameters.
 * @access Public
 */
router.post("/generate", (req: Request, res: Response) => {
  const { grade, subject, topic, objective } = req.body;

  if (!grade || !subject || !topic || !objective) {
    return res
      .status(400)
      .json({
        error: "Missing required fields: grade, subject, topic, objective",
      });
  }
  try {
    const lesson = generate({ grade, subject, topic, objective });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate lesson plan" });
  }
});

export default router;
