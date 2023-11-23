class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :primary_attribute, :secondary_attribute, :artwork_url
  has_one :before
  has_one :after
end