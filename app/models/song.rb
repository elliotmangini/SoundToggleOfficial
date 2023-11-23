class Song < ApplicationRecord
  belongs_to :playlist
  has_one :before, dependent: :destroy
  has_one :after, dependent: :destroy

  has_one_attached :artwork

  def artwork_url
    Rails.application.routes.url_helpers.url_for(artwork) if artwork.attached?
  end
end
