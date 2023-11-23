class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :email, :space_used, :plan, :avatar_url, :tag, :power

  belongs_to :featured_playlist, class_name: 'Playlist'
  has_many :links
end
