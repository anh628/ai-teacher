class CreateLessons < ActiveRecord::Migration[8.1]
  def change
    create_table :lessons, id: :serial, if_not_exists: true do |t|
      t.integer     :grade,                null: false
      t.string      :subject,              null: false, limit: 100
      t.string      :topic,                null: false, limit: 255
      t.text        :objective,            null: false
      t.string      :lesson_title,         null: false, limit: 255
      t.text        :activity,             null: false
      t.jsonb       :discussion_questions, null: false
      t.text        :support,              null: false
      t.text        :extension,            null: false
      t.text        :assessment,           null: false
      t.string      :generated_by,         null: false, limit: 100
      t.timestamptz :created_at, default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
