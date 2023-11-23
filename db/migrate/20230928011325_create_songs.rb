class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :artist
      t.string :genre
      t.binary :before_audio
      t.binary :after_audio
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
