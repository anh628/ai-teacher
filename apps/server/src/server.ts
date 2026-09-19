import "dotenv/config";

import cors from "cors";
import express from "express";
import lessonRoutes from "./routes/lessonRoutes";

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

app.use("/api/lessons", lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});