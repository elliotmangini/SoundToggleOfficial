class AddFeaturedToPlaylists < ActiveRecord::Migration[7.0]
  def change
    add_column :playlists, :featured, :boolean, default: false
  end
end
