# AI Classroom Assistant

AI Classroom Assistant is a full-stack educational application that helps teachers generate structured lesson plans from a grade level, subject, topic, and learning objective.

The project explores practical applications of AI in education while focusing on clear API design, data persistence, reusable TypeScript types, provider abstraction, and testable application architecture.

The application supports both a deterministic mock AI service and a local LLM provider through Ollama. The AI provider is separated from the Express API layer so the application can switch providers without changing the API contract.

## Features

* Generate structured lesson plans
* Grade and subject-specific lesson content
* Request validation
* AI-generated lesson validation
* Save generated lessons to PostgreSQL
* View saved lesson history
* View individual saved lessons
* REST API
* Shared TypeScript types across frontend and backend
* Automated tests
* Swappable AI provider architecture
* Local LLM support through Ollama
* Mock AI service for development and testing

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Vite

### Backend

* Node.js
* Express
* TypeScript
* PostgreSQL

### AI

* Ollama
* Llama 3
* Mock AI provider

### Testing

* Node.js built-in test runner

The backend includes automated tests for:

* Lesson generation
* Lesson request validation
* Generated lesson validation
* Saving a lesson
* Retrieving all saved lessons
* Retrieving a lesson by ID
* Handling a missing lesson
* Handling invalid lesson IDs

The Ollama integration test can be enabled separately so the standard test suite does not require Ollama to be running.

## AI Architecture

The application uses an AI service abstraction to keep provider-specific logic separate from the API layer.

```text
React frontend
      ↓
POST /api/lessons/generate
      ↓
AI service interface
      ↓
Provider selection
   ↙       ↘
Mock       Ollama
AI         ↓
           Llama 3
      ↓
Structured lesson
      ↓
Provider response validation
      ↓
React frontend
```

The provider is selected through the `AI_PROVIDER` environment variable.

Example:

```env
AI_PROVIDER=ollama
```

For development without Ollama:

```env
AI_PROVIDER=mock
```

The API route interacts with the common AI service interface rather than directly calling Ollama. This allows the AI provider to be changed without redesigning the API layer.

## Application Flow

```text
Teacher enters lesson requirements
            ↓
React frontend
            ↓
POST /api/lessons/generate
            ↓
AI service
            ↓
Configured AI provider
      ↙             ↘
   Mock AI        Ollama
                     ↓
                  Llama 3
      ↘             ↙
        Generated lesson
              ↓
     Validate AI response
              ↓
       Teacher reviews
              ↓
      POST /api/lessons/save
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
│   │   └── React + TypeScript frontend
│   │
│   └── server/
│       ├── routes/        # API routes
│       ├── services/      # AI provider services
│       ├── db/            # PostgreSQL connection and repositories
│       ├── utils/         # Validation utilities
│       └── tests/         # Backend tests
│
└── packages/
    └── shared/
        └── Shared TypeScript types
```

## API Endpoints

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| GET    | `/api/health`           | Check API health              |
| POST   | `/api/lessons/generate` | Generate a lesson plan        |
| POST   | `/api/lessons/save`     | Save a generated lesson       |
| GET    | `/api/lessons`          | Retrieve saved lessons        |
| GET    | `/api/lessons/:id`      | Retrieve a saved lesson by ID |

## Local Development

### Prerequisites

* Node.js
* PostgreSQL
* Ollama
* Llama 3, if using the local AI provider

### Install dependencies

From the project root:

```bash
npm install
```

### Configure the backend

Create `apps/server/.env`:

```env
DATABASE_URL=postgresql://localhost:5432/ai_teacher
AI_PROVIDER=ollama
```

The database must exist before starting the backend.

### Start Ollama

Make sure Ollama is installed and the selected model is available:

```bash
ollama list
```

If Llama 3 has not been downloaded:

```bash
ollama pull llama3
```

Ollama runs locally and does not require a paid API key.

### Start the frontend

```bash
cd apps/client
npm run dev
```

### Start the backend

In another terminal:

```bash
cd apps/server
npm run dev
```

The backend runs at:

```text
http://localhost:3001
```

The frontend runs at the Vite development URL shown in the terminal.

## Testing

Run the standard test suite:

```bash
cd apps/server
npm test
```

The standard test suite does not require Ollama.

To run the Ollama integration test:

```bash
RUN_OLLAMA_TESTS=true npm test
```

Ollama must be running and the configured model must be available for the integration test.

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

Or build both from the project root:

```bash
cd apps/server && npm run build && cd ../client && npm run build
```

## Future Improvements

* Add user authentication
* Add lesson editing
* Add additional lesson-generation options
* Expand automated test coverage
* Add additional local or hosted AI providers
* Improve lesson-generation prompts
* Add teacher feedback to generated lessons
* Add structured AI evaluation and quality checks
