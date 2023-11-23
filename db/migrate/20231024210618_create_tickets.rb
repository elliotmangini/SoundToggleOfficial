class CreateTickets < ActiveRecord::Migration[7.0]
  def change
    create_table :tickets do |t|
      t.references :user, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
      t.string :subject, null: false
      t.text :body, null: false
      t.boolean :is_resolved, default: false

      t.timestamps
    end
  end
end
