module AudioAttachment
  extend ActiveSupport::Concern

  included do
    has_one_attached :audio

    def audio_url
      if audio.attached?
        Rails.application.routes.url_helpers.url_for(audio) if audio.attached?
      end
    end

    def audio_filename
      audio.filename.to_s if audio.attached?
    end
  end
end
