class LinkSerializer < ActiveModel::Serializer
  attributes :id, :URL
  has_one :tag
  has_one :user
end
