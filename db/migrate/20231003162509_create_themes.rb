class CreateThemes < ActiveRecord::Migration[7.0]
  def change
    create_table :themes do |t|
      t.string :primary_color
      t.string :secondary_color
      t.string :tertiary_color
      t.string :panel_style, default: "rounded" # Default value for panel_style
      t.boolean :glow, default: true # Default value for glow
      t.string :primary_attribute_name, default: "Artist" # Default value for primary_attribute_name
      t.string :secondary_attribute_name, default: "Genre" # Default value for secondary_attribute_name
      t.boolean :display_user, default: true # Default value for display_user
      t.boolean :display_blurb, default: true # Default value for display_blurb

      t.timestamps
    end
  end
end
