class TicketSerializer < ActiveModel::Serializer
  attributes :id, :subject, :body, :is_resolved
  has_one :user
  has_one :tag
  has_one :version
end
