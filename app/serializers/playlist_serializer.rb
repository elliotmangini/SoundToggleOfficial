class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :blurb
  has_many :songs
  belongs_to :user
  belongs_to :theme
end