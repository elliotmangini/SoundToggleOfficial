class AddPlaylistUrlToPlaylists < ActiveRecord::Migration[7.0]
  def change
    add_column :playlists, :playlist_url, :string
  end
end
