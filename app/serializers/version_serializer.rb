class VersionSerializer < ActiveModel::Serializer
  attributes :id, :release, :name, :notes
end
