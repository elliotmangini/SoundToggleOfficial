class RemoveColumnsFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :default_timezone, :string
    remove_column :users, :twitch_username, :string
  end
end
