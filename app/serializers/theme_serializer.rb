class ThemeSerializer < ActiveModel::Serializer
  attributes :id, :primary_color, :secondary_color, :tertiary_color, :panel_style, :glow, :primary_attribute_name, :secondary_attribute_name, :display_user, :display_blurb, :background_color, :background_color, :name, :untoggled_name, :toggled_name, :text_primary_color, :text_secondary_color, :toggle_text_color, :toggle_highlight_color
end
