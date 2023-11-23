class RenameColumnsInSongs < ActiveRecord::Migration[6.0] # Use the correct version for your Rails application
  def change
    rename_column :songs, :artist, :primary_attribute
    rename_column :songs, :genre, :secondary_attribute
  end
end
