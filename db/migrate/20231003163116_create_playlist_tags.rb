class CreatePlaylistTags < ActiveRecord::Migration[7.0]
  def change
    create_table :playlist_tags do |t|
      t.references :playlist, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
      t.timestamps
    end

    add_index :playlist_tags, [:playlist_id, :tag_id], unique: true
  end
end
