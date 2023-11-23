class ThemesController < ApplicationController
  before_action :set_theme, only: %i[ show update destroy ]

  # GET /themes
  def index
    @themes = Theme.all

    render json: @themes
  end

  # GET /themes/1
  def free
    render json: Theme.where(access: "free");
  end

# POST /themes
def create
  # Find the playlist by its ID
  puts '🚨🚨🚨🚨'
  puts "#{params[:playlist_id]}"
  playlist = Playlist.find_by_id(params[:playlist_id])

  # Check if the user owns the playlist
  if playlist.user.id == @current_user.id
    # Find the existing theme associated with the playlist
    existing_theme = playlist.theme

    if existing_theme.nil? || existing_theme.name != "custom"
      # Create a new theme with the provided parameters
      @theme = Theme.new(theme_params)
      @theme.name = "custom" # Set the theme name to "custom"

      # Associate the new theme with the playlist
      playlist.theme = @theme
      playlist.save
    else
      # Update the existing custom theme with the provided parameters
      @theme = existing_theme
      @theme.assign_attributes(theme_params)
    end

    if @theme.save
      render json: @theme, status: :created, location: @theme
    else
      render json: @theme.errors, status: :unprocessable_entity
    end
  else
    render json: { error: "You do not have permission to modify this playlist's theme." }, status: :forbidden
  end
end


  # PATCH/PUT /themes/1
  def update
    if @theme.update(theme_params)
      render json: @theme
    else
      render json: @theme.errors, status: :unprocessable_entity
    end
  end

  # DELETE /themes/1
  def destroy
    @theme.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_theme
      @theme = Theme.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def theme_params
      params.require(:theme).permit(
        :primary_color,
        :secondary_color,
        :tertiary_color,
        :panel_style,
        :glow,
        :primary_attribute_name,
        :secondary_attribute_name,
        :background_color,
        :untoggled_name,
        :toggled_name,
        :playlist_id,
        :display_user,
        :display_blurb,
        :text_primary_color,
        :text_secondary_color,
        :name,
        :toggle_text_color,
        :toggle_highlight_color,
      )
    end
    
end
