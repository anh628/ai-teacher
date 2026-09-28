class Lesson < ApplicationRecord
  validates :grade, numericality: { only_integer: true, in: 1..12 }
  validates :subject, :topic, :objective, :lesson_title, :activity,
            :support, :extension, :assessment, :generated_by, presence: true
  validates :subject, :generated_by, length: { maximum: 100 }
  validates :topic, :lesson_title,   length: { maximum: 255 }
  validate  :discussion_questions_must_be_strings

  scope :recent, -> { order(created_at: :desc) }

  private

  def discussion_questions_must_be_strings
    valid = discussion_questions.is_a?(Array) &&
            discussion_questions.any? &&
            discussion_questions.all? { |q| q.is_a?(String) && q.strip.present? }
    errors.add(:discussion_questions, "must be a non-empty list of questions") unless valid
  end
end
