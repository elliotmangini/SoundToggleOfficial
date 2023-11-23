class PlaylistTagsController < ApplicationController
  before_action :set_playlist_tag, only: %i[ show update destroy ]

  # GET /playlist_tags
  def index
    @playlist_tags = PlaylistTag.all

    render json: @playlist_tags
  end

  # GET /playlist_tags/1
  def show
    render json: @playlist_tag
  end

  # POST /playlist_tags
  def create
    @playlist_tag = PlaylistTag.new(playlist_tag_params)

    if @playlist_tag.save
      render json: @playlist_tag, status: :created, location: @playlist_tag
    else
      render json: @playlist_tag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /playlist_tags/1
  def update
    if @playlist_tag.update(playlist_tag_params)
      render json: @playlist_tag
    else
      render json: @playlist_tag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /playlist_tags/1
  def destroy
    @playlist_tag.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playlist_tag
      @playlist_tag = PlaylistTag.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def playlist_tag_params
      params.require(:playlist_tag).permit(:playlist_id, :tag_id)
    end
end
