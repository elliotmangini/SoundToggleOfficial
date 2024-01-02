class SongsController < ApplicationController
  before_action :set_song, only: %i[ show update destroy ]

  # GET /songs
  def index
    @songs = Song.all

    render json: @songs
  end

  # GET /songs/1
  def show
    playlist = {
      id: @song.playlist.id,
      name: @song.playlist.name,
      blurb: @song.playlist.blurb,
      theme: @song.playlist.theme.as_json,
      user: @song.playlist.user.as_json,
      songs: [{
        after: @song.after.as_json(methods: [:audio_url]),
        before: @song.before.as_json(methods: [:audio_url]),
        artwork_url: @song.artwork_url,
        id: @song.id,
        primary_attribute: @song.primary_attribute,
        secondary_attribute: @song.secondary_attribute,
        title: @song.title,
      }]
    }

    render json: playlist
  end

  # POST /songs
  def create
    @playlist = Playlist.find_by_id(params[:playlist_id])
    @song = @playlist.songs.create!(song_params)
  
    if @song.save
      # Create a Before model associated with the song
      before = @song.build_before
      before.save
  
      # Create an After model associated with the song
      after = @song.build_after
      after.save
  
      render json: @song, status: :created
    else
      render json: { errors: @song.errors }, status: :unprocessable_entity
    end
  end

  def set_artwork
    @song = Song.find(params[:id])
    
    if @song.artwork.attached?
      @song.artwork.purge
    end
  
    @song.update_attribute(:artwork, params[:artwork])

    artwork_url = @song.artwork_url
    render json: { artwork_url: artwork_url }, status: :accepted
  end

  def set_before
    @song = Song.find(params[:id])
    before = @song.before # Find the existing 'before' model
    if params[:before].present? # Check if a new file is provided
      if before.audio.attached?
        before.audio.purge # Remove the existing audio file
      end
      before.audio.attach(params[:before]) # Attach the new audio file
    end
    @current_user.update_user_storage
    render json: @song, status: :ok
  end
  
  def set_after
    @song = Song.find(params[:id])
    after = @song.after # Find the existing 'after' model
    if params[:after].present? # Check if a new file is provided
      if after.audio.attached?
        after.audio.purge # Remove the existing audio file
      end
      after.audio.attach(params[:after]) # Attach the new audio file
    end
    @current_user.update_user_storage
    render json: @song, status: :ok
  end
  

  # PATCH/PUT /songs/1
  def update
    @song = Song.find(params[:id])
  
    # Check if the current user is the owner of the song
    if @song.playlist.user == @current_user
      if @song.update(song_params)
        render json: @song
      else
        render json: @song.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "You are not authorized to update this song" }, status: :unauthorized
    end
  end

  # DELETE /songs/1
  def destroy
    @song.destroy
    @current_user.update_user_storage
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_song
      @song = Song.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def song_params
      params.permit(:title, :primary_attribute, :secondary_attribute, :user_id, :playlist_id)
    end
end
