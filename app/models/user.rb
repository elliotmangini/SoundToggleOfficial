class User < ApplicationRecord
    has_secure_password
    validates :password, length: { minimum: 6 }
    validates :username, uniqueness: { case_sensitive: false }
    validates :username, length: { in: 3..26 }
    validates :email, uniqueness: { case_sensitive: false }
    validates :email, format: {
        with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i,
        message: ->(user, data) { "\"#{data[:value]}\" is not of valid email format." }
    }
    validate :username_not_reserved
    validates :found_us, presence: true
  
    has_one_attached :avatar
    has_many :playlists, dependent: :destroy
    has_many :tickets, dependent: :destroy
    has_many :links, dependent: :destroy
    has_one :featured_playlist, class_name: "Playlist"
    belongs_to :tag, optional: true
  
  
    def avatar_url
      Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
    end

    def update_user_storage
      total_files = 0
      total_bytes = 0
    
      playlists = Playlist.where(user_id: self.id).includes(songs: [:before, :after])
    
      playlists.each do |playlist|
        playlist.songs.each do |song|
          total_files += 1 if song.before.audio.attached?
          total_files += 1 if song.after.audio.attached?
    
          total_bytes += song.before.audio.blob.byte_size if song.before.audio.attached?
          total_bytes += song.after.audio.blob.byte_size if song.after.audio.attached?
        end
      end
    
      total_megabytes = total_bytes.to_f / (1024 * 1024) # Convert bytes to megabytes
    
      # Update the space_used attribute for the user without running validations
      self.update_column(:space_used, total_megabytes.round(2))
    
      {
        total_files: total_files,
        total_megabytes: total_megabytes.round(2), # Round to 2 decimal places
        total_bytes: total_bytes
      }
    end

    def send_password_reset
      generate_token(:password_reset_token)
      self.password_reset_sent_at = Time.zone.now
      save!
      PasswrodMailer.password_reset(self).deliver
    end

    def generate_password_reset_token
      self.reset_token = SecureRandom.urlsafe_base64
      self.reset_token_expires_at = 1.hour.from_now
      save!
    end
      
  
    private
  
    def username_not_reserved

        # Add more reserved route names as needed
        reserved_route_names = ["login", "logout", "signup", "home", "about", "setup", "pricing", "admin"]
        if reserved_route_names.include?(username.downcase)
            errors.add(:username, "is not available. Please choose a different one.")
        end
    end
  end
  