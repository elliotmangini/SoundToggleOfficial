class PlaylistTagSerializer < ActiveModel::Serializer
  attributes :id
  has_one :playlist
  has_one :tag
end
