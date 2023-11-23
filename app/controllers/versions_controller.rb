class VersionsController < ApplicationController
  before_action :set_version, only: %i[show update destroy]

  # Controller method to get the latest version
  def latest
    # Find the latest version based on your model logic
    latest_version = Version.order(created_at: :desc).first

    if latest_version
      render json: latest_version, status: :ok
    else
      render json: { error: 'No latest version found' }, status: :not_found
    end
  end

  # GET /versions
  def index
  @versions = Version.all

    render json: @versions
  end

  # GET /versions/1
  def show
    render json: @version
  end

  # POST /versions
  def create
    @version = Version.new(version_params)

    if @version.save
      render json: @version, status: :created, location: @version
    else
      render json: @version.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /versions/1
  def update
    if @version.update(version_params)
      render json: @version
    else
      render json: @version.errors, status: :unprocessable_entity
    end
  end

  # DELETE /versions/1
  def destroy
    @version.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_version
      @version = Version.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def version_params
      params.permit(:release, :name, :notes)
    end
end
