class AddAccessToThemes < ActiveRecord::Migration[7.0]
  def change
    add_column :themes, :access, :string
  end
end
