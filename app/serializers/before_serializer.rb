class BeforeSerializer < ActiveModel::Serializer
  attributes :id, :audio_url, :audio_filename, :attenuation
end