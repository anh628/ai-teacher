# AI Classroom Assistant

AI Classroom Assistant is a full-stack educational application that helps teachers generate structured lesson plans from a grade level, subject, topic, and objective.

The project was built to explore practical applications of AI in education while focusing on clear API design, data persistence, reusable TypeScript types, and testable application architecture.

The application uses a mock AI service rather than a paid external LLM API. The mock service provides structured lesson content so the rest of the application can be developed and tested without requiring an API key or external AI service.
The AI service is intentionally separated from the Express routes so a real LLM provider can be introduced later without needing to redesign the application's API layer. 

## Features

- Generate structured lesson plans
- Grade and subject-specific lesson content
- Request validation
- Save generated lessons to PostgreSQL
- View saved lesson history
- View individual saved lessons
- REST API
- Shared TypeScript types across frontend and backend
- Automated tests
- Mock AI service that can be replaced with a real AI provider

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Vite

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL

### Testing

- Node.js built-in test runner

The backend includes automated tests for:

- Lesson generation
- Lesson request validation
- Saving a lesson
- Retrieving all saved lessons
- Retrieving a lesson by ID
- Handling a missing lesson
- Handling invalid lesson IDs

## Project Structure

```
ai-teacher/
├── apps/
│   ├── client/
│   │   └── React + TypeScript frontend
│   │
│   └── server/
│       ├── routes/       # API routes
│       ├── services/     # AI generation services
│       ├── db/           # PostgreSQL connection and repositories
│       ├── utils/        # Request validation
│       └── tests/        # Backend tests
│
└── packages/
    └── shared/
        └── Shared TypeScript types
```

## Application Flow

```text
Teacher enters lesson requirements
            ↓
React frontend
            ↓
POST /api/lessons/generate
            ↓
Mock AI service
            ↓
Generated lesson returned
            ↓
Teacher reviews lesson
            ↓
POST /api/lessons/save
            ↓
PostgreSQL
            ↓
Lesson History
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check API health |
| POST | `/api/lessons/generate` | Generate a lesson plan |
| POST | `/api/lessons/save` | Save a generated lesson |
| GET | `/api/lessons` | Retrieve saved lessons |
| GET | `/api/lessons/:id` | Retrieve a saved lesson by ID |

## Development

### Start the frontend

```bash
cd apps/client
npm install
npm run dev
```

### Start the backend

```bash
cd apps/server
npm install
npm run dev
```

### Run tests

```bash
cd apps/server
npm test
```

### Build

```bash
cd apps/server && npm run build && cd apps/client && npm run build
```

## Future Improvements

- Replace the mock AI service with a real LLM provider
- Add user authentication
- Add lesson editing
- Add additional lesson-generation options
- Expand automated test coverage