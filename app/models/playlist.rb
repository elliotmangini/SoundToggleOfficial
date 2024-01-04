class Playlist < ApplicationRecord
  belongs_to :user
  belongs_to :theme
  has_many :songs, -> { order(created_at: :desc) }, dependent: :destroy
  has_many :playlist_tags
  has_many :tags, through: :playlist_tags

  validates :name, exclusion: { in: ['heroplaylist'] }

  before_save :generate_playlist_url
  def generate_playlist_url
    self.playlist_url = name.parameterize unless playlist_url.present?
  end
  
end
