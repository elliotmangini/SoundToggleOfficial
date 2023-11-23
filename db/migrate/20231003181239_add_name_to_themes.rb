class AddNameToThemes < ActiveRecord::Migration[7.0]
  def change
    add_column :themes, :name, :string
  end
end
