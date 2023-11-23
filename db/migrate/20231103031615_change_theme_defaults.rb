class ChangeThemeDefaults < ActiveRecord::Migration[7.0]
  def change
    change_column_default :themes, :background_color, "#004f6b"
    change_column_default :themes, :primary_color, "#FFFFFF"
    change_column_default :themes, :secondary_color, "#394153"
    change_column_default :themes, :tertiary_color, "#1c627a"
    change_column_default :themes, :toggle_text_color, "#394153"
    change_column_default :themes, :toggle_highlight_color, "#EEC643"
    change_column_default :themes, :text_primary_color, "#f4f4f4"
    change_column_default :themes, :text_secondary_color, "#bcd0d7"

    change_column_default :themes, :name, "custom"



  end
end
