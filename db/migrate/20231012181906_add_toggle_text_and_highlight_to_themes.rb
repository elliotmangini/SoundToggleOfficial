class AddToggleTextAndHighlightToThemes < ActiveRecord::Migration[7.0]
  def change
    add_column :themes, :toggle_text_color, :string, default: "394153"
    add_column :themes, :toggle_highlight_color, :string, default: "EEC643"
  end
end
