class AddTextColorsToThemes < ActiveRecord::Migration[6.1]
  def change
    add_column :themes, :text_primary_color, :string, default: "eaf3f7"
    add_column :themes, :text_secondary_color, :string, default: "bcd0d7"
  end
end
