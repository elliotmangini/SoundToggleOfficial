class PlaylistTag < ApplicationRecord
  belongs_to :playlist
  belongs_to :tag
end
