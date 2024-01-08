require "MailchimpMarketing"

class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :public_profile]

  def create
    user = User.create!(user_params)
    # Check if the tag exists; if not, create it
    tag_name = params[:tag]
    tag = Tag.find_by(name: params[:tag])
    tag = Tag.create(name:  params[:tag]) unless tag
    user.tag = tag
    user.save
    featured_playlist = Playlist.create!(name: 'Featured Playlist', theme: Theme.find_by(name: "Classic"), user: user)
    user.featured_playlist = featured_playlist

    mailchimp = MailchimpMarketing::Client.new
    mailchimp.set_config({
      :api_key => Rails.application.credentials.dig(:mailchimp, :api_key),
      :server => Rails.application.credentials.dig(:mailchimp, :server)
    })
    list_id = Rails.application.credentials.dig(:mailchimp, :audience)
    subscribing_user = {
      username: params[:username],
      email_address: params[:email]
    }
    response = mailchimp.lists.add_list_member list_id, {
      email_address: subscribing_user[:email_address],
      status: "subscribed",
      merge_fields: {
        UNAME: subscribing_user[:username],
      },
    }

    session[:user_id] = user.id
    render json: user, status: :created
  end
  
  def newsletter
    # Check if the current user has admin privileges
    if @current_user.power == "admin"
      # Retrieve all users from the database
      users = User.all
  
      # Extract usernames and creation dates from the users
      user_data = users.map { |user| { username: user.username, created_at: user.created_at, email: user.email, found_us: user.found_us } }
  
      # Sort user_data based on created_at in descending order (newest to oldest)
      user_data.sort_by! { |user| user[:created_at] }.reverse!
  
      # Extract the email addresses from the users and join them into a single string
      emails = users.pluck(:email).join(", ")
  
      # Now render the response as JSON
      render json: { user_data: user_data, emails: emails }
    else
      render json: { error: 'Access denied. You do not have admin privileges.' }, status: :forbidden
    end
  end  

  def update_bio
    bio = params[:bio]
    
    if @current_user.update_attribute(:bio, bio)
      render json: @current_user, status: :ok
    else
      render json: { error: 'Failed to update user' }, status: :unprocessable_entity
    end
  end
  
  
  

  def set_avatar
    if @current_user.avatar.attached?
      @current_user.avatar.purge
    end

    @current_user.update_attribute(:avatar, params[:avatar])
    render json: @current_user, status: :accepted
  end

  def show
    render json: @current_user
  end

  def public_profile
    user = User.includes(featured_playlist: [:songs => [:before, :after]]).find_by(username: params[:username])
    if user
      render json: {
        username: user.username,
        bio: user.bio,
        avatar_url: user.avatar_url,
        featured_playlist: {
          id: user.featured_playlist.id,
          name: user.featured_playlist.name,
          blurb: user.featured_playlist.blurb,
          user_id: user.featured_playlist.user_id,
          theme_id: user.featured_playlist.theme_id,
          created_at: user.featured_playlist.created_at,
          updated_at: user.featured_playlist.updated_at,
          songs: user.featured_playlist.songs.as_json(only: [:id, :title, :artist, :genre], include: {
            before: { methods: [:audio_url, :audio_filename] },
            after: { methods: [:audio_url, :audio_filename] }
          }, methods: [:artwork_url])
        }
      }, status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  private

  def user_params
    params.permit(:username, :avatar, :bio, :email, :password, :password_confirmation, :found_us)
  end
end
