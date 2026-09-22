import type { Lesson } from "@ai-teacher/shared";
import { saveLesson } from "../api/lessonApi";
import { useState } from "react";

type EditableLessonDisplayProps = {
  lesson: Lesson | null;
  setError: (message: string) => void;
};

type EditTextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onDone: () => void;
  type: "input" | "textarea";
};

function EditTextField({ value, onChange, onDone, type }: EditTextFieldProps) {
  return (
    <div className="edit-field">
      {type === "input" ? (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDone();
        }}
      >
        Done
      </button>
    </div>
  );
}

export default function EditableLessonDisplay({
  lesson,
  setError,
}: EditableLessonDisplayProps) {
  const [editedLesson, setEditedLesson] = useState<Lesson | null>(lesson);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  async function handleSave() {

    if (!editedLesson) {
      return;
    }

    setSaving(true);

    try {
      await saveLesson(editedLesson);
      setSaved(true);
      setError(null)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save the lesson. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (!editedLesson) {
    return (
      <div className="empty-page">
        <p>No lesson to view.</p>
        <p>Generate a new lesson or view your lesson history.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="lesson">
        <div
          className="editable-field"
          onClick={() => setEditingField("lessonTitle")}
        >
          {editingField === "lessonTitle" ? (
            <EditTextField
              type="input"
              value={editedLesson.lessonTitle}
              onChange={(value) =>
                setEditedLesson({
                  ...editedLesson,
                  lessonTitle: value,
                })
              }
              onDone={() => setEditingField(null)}
            />
          ) : (
            <h2>{editedLesson.lessonTitle}</h2>
          )}
        </div>
        <span className="ai-badge">
          Generated with{" "}
          {editedLesson.generatedBy === "ollama" ? "Ollama" : "Mock AI"}
        </span>
        <p className="lesson-review-note">
          Review and adapt this lesson before using it with students.
        </p>

        {/* Lesson Metadata */}
        <div className="lesson-meta">
          {/* Grade */}
          <div>
            <span>Grade</span>
            <strong>{editedLesson.grade}</strong>
          </div>

          {/* Subject */}
          <div
            className="editable-field"
            onClick={() => setEditingField("subject")}
          >
            <span>Subject</span>
            {editingField === "subject" ? (
              <EditTextField
                type="input"
                value={editedLesson.subject}
                onChange={(value) =>
                  setEditedLesson({
                    ...editedLesson,
                    subject: value,
                  })
                }
                onDone={() => setEditingField(null)}
              />
            ) : (
              <strong>{editedLesson.subject}</strong>
            )}
          </div>

          {/* Topic */}
          <div
            className="editable-field"
            onClick={() => setEditingField("topic")}
          >
            <span>Topic</span>

            {editingField === "topic" ? (
              <EditTextField
                type="input"
                value={editedLesson.topic}
                onChange={(value) =>
                  setEditedLesson({
                    ...editedLesson,
                    topic: value,
                  })
                }
                onDone={() => setEditingField(null)}
              />
            ) : (
              <strong>{editedLesson.topic}</strong>
            )}
          </div>
        </div>

        <div
          className="lesson-section editable-field"
          onClick={() => setEditingField("objective")}
        >
          <h3>Objective</h3>

          {editingField === "objective" ? (
            <EditTextField
              type="textarea"
              value={editedLesson.objective}
              onChange={(value) =>
                setEditedLesson({
                  ...editedLesson,
                  objective: value,
                })
              }
              onDone={() => setEditingField(null)}
            />
          ) : (
            <p>{editedLesson.objective}</p>
          )}
        </div>

        <div
          className="lesson-section editable-field"
          onClick={() => setEditingField("activity")}
        >
          <h3>Activity</h3>

          {editingField === "activity" ? (
            <EditTextField
              type="textarea"
              value={editedLesson.activity}
              onChange={(value) =>
                setEditedLesson({
                  ...editedLesson,
                  activity: value,
                })
              }
              onDone={() => setEditingField(null)}
            />
          ) : (
            <p>{editedLesson.activity}</p>
          )}
        </div>

        <div className="lesson-section">
          <h3>Discussion Questions</h3>
          <ul>
            {editedLesson.discussionQuestions.map(
              (question: string, index: number) => (
                <li
                  key={index}
                  className="editable-field"
                  onClick={() => setEditingField(`discussionQuestion-${index}`)}
                >
                  {editingField === `discussionQuestion-${index}` ? (
                    <EditTextField
                      type="input"
                      value={question}
                      onChange={(value) => {
                        const updatedQuestions = [
                          ...editedLesson.discussionQuestions,
                        ];

                        updatedQuestions[index] = value;

                        setEditedLesson({
                          ...editedLesson,
                          discussionQuestions: updatedQuestions,
                        });
                      }}
                      onDone={() => setEditingField(null)}
                    />
                  ) : (
                    question
                  )}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="lesson-section">
          <h3>Differentiation</h3>

          <div className="differentiation-grid">
            <div
              className="editable-field"
              onClick={() => setEditingField("support")}
            >
              <h4>Support: </h4>
              {editingField === "support" ? (
                <EditTextField
                  type="textarea"
                  value={editedLesson.differentiation.support}
                  onChange={(value) =>
                    setEditedLesson({
                      ...editedLesson,
                      differentiation: {
                        ...editedLesson.differentiation,
                        support: value,
                      },
                    })
                  }
                  onDone={() => setEditingField(null)}
                />
              ) : (
                <p>{editedLesson.differentiation.support}</p>
              )}
            </div>

            <div
              className="editable-field"
              onClick={() => setEditingField("extension")}
            >
              <h4>Extension: </h4>
              {editingField === "extension" ? (
                <EditTextField
                  type="textarea"
                  value={editedLesson.differentiation.extension}
                  onChange={(value) =>
                    setEditedLesson({
                      ...editedLesson,
                      differentiation: {
                        ...editedLesson.differentiation,
                        extension: value,
                      },
                    })
                  }
                  onDone={() => setEditingField(null)}
                />
              ) : (
                <p>{editedLesson.differentiation.extension}</p>
              )}
            </div>
          </div>
        </div>

        <div
          className="lesson-section editable-field"
          onClick={() => setEditingField("assessment")}
        >
          <h3>Assessment</h3>
          {editingField === "assessment" ? (
            <EditTextField
              type="textarea"
              value={editedLesson.assessment}
              onChange={(value) =>
                setEditedLesson({
                  ...editedLesson,
                  assessment: value,
                })
              }
              onDone={() => setEditingField(null)}
            />
          ) : (
            <p>{editedLesson.assessment}</p>
          )}
        </div>

        <footer className="lesson-footer">
          <small>Generated by: {editedLesson.generatedBy}</small>
        </footer>
      </section>

      <button type="button" onClick={handleSave} disabled={saved || saving}>
        {saving ? "Saving..." : saved ? "Lesson saved" : "Save lesson "}
      </button>
    </div>
  );
}
