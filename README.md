# AI Classroom Assistant

AI Classroom Assistant is a full-stack educational application that helps teachers generate structured lesson plans from a grade level, subject, topic, and learning objective.

The project explores practical applications of AI in education while focusing on clear API design, data persistence, reusable TypeScript types, provider abstraction, AI response validation, and a teacher-in-the-loop workflow.

Teachers can review and edit AI-generated lesson content before saving it to their lesson history.

## Features

- Generate structured lesson plans
- Grade and subject-specific lesson content
- Local AI generation with Ollama and Llama 3
- Mock AI provider for development and testing
- Swappable AI provider architecture
- Request validation
- AI-generated response validation
- Teacher review and editing before saving
- Save generated lessons to PostgreSQL
- View saved lesson history
- View individual saved lessons
- REST API
- Shared TypeScript types across frontend and backend
- Automated backend tests
- Empty-state and error handling
- Environment-based configuration

## Tech Stack

**Frontend**
- React
- TypeScript
- React Router
- Vite

**Backend**
- Node.js
- Express
- TypeScript
- PostgreSQL

**AI**
- Ollama
- Llama 3
- Mock AI provider

**Testing**
- Node.js built-in test runner

## AI Architecture

The AI generation logic is separated from the Express API layer through a common service interface.

```text
React Frontend
      ↓
POST /api/lessons/generate
      ↓
AI Service Interface
      ↓
Configured Provider
   ↙          ↘
Mock AI      Ollama
                ↓
             Llama 3
      ↓
Validate AI Response
      ↓
Generated Lesson
      ↓
Teacher Reviews and Edits
      ↓
POST /api/lessons/save
      ↓
PostgreSQL
```

The provider is selected through the `AI_PROVIDER` environment variable:

```env
AI_PROVIDER=ollama
```

or:

```env
AI_PROVIDER=mock
```

This allows the application to switch AI providers without changing the API contract or frontend.

## Teacher Review Workflow

AI-generated content is treated as a starting point rather than final instructional material.

After a lesson is generated, the teacher can:

1. Review the generated lesson.
2. Edit the lesson title, subject, topic, objective, activity, discussion questions, differentiation, and assessment.
3. Adapt the content for their classroom.
4. Save the reviewed lesson to PostgreSQL.

The application displays the AI provider used to generate the lesson and reminds teachers to review and adapt the content before using it with students.

## Application Flow

```text
Teacher enters lesson requirements
            ↓
React frontend
            ↓
Generate lesson API
            ↓
AI service
            ↓
Ollama / Mock AI
            ↓
Validate generated response
            ↓
Display lesson
            ↓
Teacher reviews and edits
            ↓
Save lesson
            ↓
PostgreSQL
            ↓
Lesson History
```

## Project Structure

```text
ai-teacher/
├── apps/
│   ├── client/
│   │   └── React frontend
│   │
│   └── server/
│       ├── routes/
│       ├── services/
│       ├── db/
│       ├── utils/
│       └── tests/
│
└── packages/
    └── shared/
        └── Shared TypeScript types
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check API status |
| POST | `/api/lessons/generate` | Generate a lesson |
| POST | `/api/lessons/save` | Save a reviewed lesson |
| GET | `/api/lessons` | Retrieve saved lessons |
| GET | `/api/lessons/:id` | Retrieve one saved lesson |

## Local Development

### Prerequisites

- Node.js
- PostgreSQL
- Ollama
- Llama 3

Ollama allows the project to use a local language model without requiring a paid API key.

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-teacher
```

### 2. Configure PostgreSQL

Create the database:

```bash
createdb ai_teacher
```

Create the `lessons` table using the SQL schema in the project.

### 3. Configure the server

Create:

```text
apps/server/.env
```

Add:

```env
DATABASE_URL=postgresql://localhost:5432/ai_teacher
AI_PROVIDER=ollama
```

### 4. Set up Ollama

Check that Ollama is installed:

```bash
ollama list
```

Pull Llama 3 if necessary:

```bash
ollama pull llama3
```

Make sure Ollama is running before generating lessons.

### 5. Start the backend

```bash
cd apps/server
npm install
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

### 6. Start the frontend

In another terminal:

```bash
cd apps/client
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

## Testing

Run the backend test suite:

```bash
cd apps/server
npm test
```

The project includes tests for request validation, generated lesson validation, repository behavior, API behavior, and other backend functionality.

Ollama integration tests can be enabled with:

```bash
RUN_OLLAMA_TESTS=true npm test
```

Ollama must be running for the local AI integration tests.

## Build

Build the backend:

```bash
cd apps/server
npm run build
```

Build the frontend:

```bash
cd apps/client
npm run build
```

## Design Decisions

### Provider abstraction

The AI provider is separated from the API layer so that the application does not depend directly on a specific LLM provider.

This makes it possible to use a deterministic mock service during development and testing while also supporting a local LLM through Ollama.

### AI response validation

LLM output is treated as untrusted external data. The application validates the generated response before converting it into the application's `Lesson` structure.

### Shared TypeScript types

The frontend and backend use shared TypeScript types to keep the lesson data contract consistent across the application.

### Human-in-the-loop AI

Generated lessons are presented as editable drafts. Teachers remain responsible for reviewing and adapting the content before saving and using it.

## Future Improvements

Potential future improvements include:

- User authentication
- Lesson editing after saving
- Additional AI providers
- More configurable lesson formats
- Teacher feedback on generated lessons
- Improved prompt customization
- Additional automated test coverage
- Structured evaluation of generated lesson quality
- More classroom-specific personalization

## Project Purpose

This project was built as a portfolio application to explore the intersection of software engineering, educational technology, and practical AI development.

It demonstrates a full-stack workflow from user input and API design through AI integration, response validation, human review, and persistent data storage.