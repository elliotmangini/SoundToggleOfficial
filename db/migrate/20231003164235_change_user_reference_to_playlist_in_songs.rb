class ChangeUserReferenceToPlaylistInSongs < ActiveRecord::Migration[7.0]
  def change
    remove_reference :songs, :user, foreign_key: true
    add_reference :songs, :playlist, foreign_key: true
  end
end
