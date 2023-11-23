class Tag < ApplicationRecord
    has_many :playlist_tags
    has_many :playlists, through: :playlist_tags
    has_many :users
    has_many :tickets
end