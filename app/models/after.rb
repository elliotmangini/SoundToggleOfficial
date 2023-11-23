class After < ApplicationRecord
  include AudioAttachment
  belongs_to :song
end