class BeforesController < ApplicationController
  before_action :set_before, only: %i[ show update destroy ]

  # GET /befores
  def index
    @befores = Before.all

    render json: @befores
  end

  # GET /befores/1
  def show
    render json: @before
  end

  # POST /befores
  def create
    @before = Before.new(before_params)

    if @before.save
      render json: @before, status: :created, location: @before
    else
      render json: @before.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /befores/1
  def update
    if @before.update(before_params)
      render json: @before
    else
      render json: @before.errors, status: :unprocessable_entity
    end
  end

  # DELETE /befores/1
  def destroy
    @before.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_before
      @before = Before.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def before_params
      params.require(:before).permit(:song_id)
    end
end
