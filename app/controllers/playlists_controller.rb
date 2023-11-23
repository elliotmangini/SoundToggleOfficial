class PlaylistsController < ApplicationController
  before_action :set_playlist, only: %i[ update destroy ]
  skip_before_action :authorize, only: [:show]

  # GET /playlists
  def index
    @playlists = Playlist.all

    render json: @playlists
  end

  # GET /playlists/:username/:playlist_url
  def show
    puts "🚨🚨🚨#{params[:username]} #{params[:playlist_url]}🚨🚨🚨"
    if params[:username] == 'heroplaylist'
      # Find the featured playlist by searching for the one with the 'featured' attribute set to true
      @playlist = Playlist.find_by(featured: true)
    elsif params[:playlist_url] == 'default'
      # Handle the case when the playlist_url is "default"
      # Find the user's featured playlist by username
      @playlist = User.find_by(username: params[:username]).featured_playlist
    else
      # Find the playlist based on the provided username and playlist_url
      @playlist = User.find_by(username: params[:username]).playlists.find_by(playlist_url: params[:playlist_url])
      puts "🚨✅🚨#{params[:username]} #{params[:playlist_url]}🚨✅🚨"

    end

    if @playlist
      render json: @playlist, include: ['playlist_url', 'songs', 'songs.before', 'songs.after', 'user', 'user.links', 'user.links.tag', 'theme']
    else
      render json: { error: 'Playlist not found' }, status: :not_found
    end
  end
  
  # POST /playlists
  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      render json: @playlist, status: :created, location: @playlist
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /playlists/1
  def update
    if @playlist.update(playlist_params)
      render json: @playlist
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  # DELETE /playlists/1
  def destroy
    @playlist.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playlist
      @playlist = Playlist.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def playlist_params
      params.require(:playlist).permit(:name, :blurb, :user_id, :theme_id)
    end
end
