class CreateBefores < ActiveRecord::Migration[7.0]
  def change
    create_table :befores do |t|
      t.references :song, null: false, foreign_key: true

      t.timestamps
    end
  end
end
