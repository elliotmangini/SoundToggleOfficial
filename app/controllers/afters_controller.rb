class AftersController < ApplicationController
  before_action :set_after, only: %i[ show update destroy ]

  # GET /afters
  def index
    @afters = After.all

    render json: @afters
  end

  # GET /afters/1
  def show
    render json: @after
  end

  # POST /afters
  def create
    @after = After.new(after_params)

    if @after.save
      render json: @after, status: :created, location: @after
    else
      render json: @after.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /afters/1
  def update
    if @after.update(after_params)
      render json: @after
    else
      render json: @after.errors, status: :unprocessable_entity
    end
  end

  # DELETE /afters/1
  def destroy
    @after.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_after
      @after = After.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def after_params
      params.require(:after).permit(:song_id)
    end
end
