class CreateVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :versions do |t|
      t.string :release
      t.string :name
      t.text :notes

      t.timestamps
    end
  end
end
