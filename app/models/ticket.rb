class Ticket < ApplicationRecord
  belongs_to :user
  belongs_to :tag
  belongs_to :version
  
  # Define an attribute accessor for tag_name
  attr_accessor :tag_name

  # Add a custom setter to associate the Tag
  def tag_name=(name)
    self.tag = Tag.find_or_create_by(name: name)
  end
end