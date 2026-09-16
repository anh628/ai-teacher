import type { LessonPlanRequest } from "@ai-teacher/shared";

function App() {
  const exampleRequest: LessonPlanRequest = {
    grade: 3,
    subject: "Science",
    topic: "The Water Cycle",
    objective: "Students will explain the main stages of the water cycle.",
  };

  console.log(exampleRequest);

  return (
    <main>
      <h1>AI Teacher</h1>
      <p>Lesson Plan Generator</p>
    </main>
  );
}

export default App;