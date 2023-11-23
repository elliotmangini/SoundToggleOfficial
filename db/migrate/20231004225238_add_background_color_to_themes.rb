class AddBackgroundColorToThemes < ActiveRecord::Migration[7.0]
  def change
    add_column :themes, :background_color, :string, default: '151415'
  end
end
