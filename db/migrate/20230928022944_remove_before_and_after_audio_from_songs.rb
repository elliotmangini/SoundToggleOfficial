class RemoveBeforeAndAfterAudioFromSongs < ActiveRecord::Migration[6.0]
  def change
    remove_column :songs, :before_audio
    remove_column :songs, :after_audio
  end
end
