class AddTagAndFeaturedPlaylistToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :tag, foreign_key: true
    add_reference :users, :featured_playlist, foreign_key: { to_table: :playlists }
  end
end
