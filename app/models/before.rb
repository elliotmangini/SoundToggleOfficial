class Before < ApplicationRecord
  include AudioAttachment
  belongs_to :song
end