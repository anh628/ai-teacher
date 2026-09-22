CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    grade INTEGER NOT NULL,
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    objective TEXT NOT NULL,
    lesson_title VARCHAR(255) NOT NULL,
    activity TEXT NOT NULL,
    discussion_questions JSONB NOT NULL,
    support TEXT NOT NULL,
    extension TEXT NOT NULL,
    assessment TEXT NOT NULL,
    generated_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);