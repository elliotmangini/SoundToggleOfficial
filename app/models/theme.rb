class Theme < ApplicationRecord
    HEX_COLOR_REGEX = /\A#(?:[0-9a-fA-F]{6})\z/
    
    validates :primary_color, :secondary_color, :tertiary_color, format: { with: HEX_COLOR_REGEX }
  
    has_many :playlists
  end
  