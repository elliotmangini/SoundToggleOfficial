class TicketsController < ApplicationController
  before_action :set_ticket, only: %i[ show update destroy ]
  before_action :check_admin_power, only: %i[show index destroy]

  # GET /tickets
  def index
    @tickets = Ticket.all

    render json: @tickets
  end

  # GET /tickets/1
  def show
    render json: @ticket
  end

  # In your create action
  def create
    tag = Tag.find_or_create_by(name: params[:tag_name]) # Retrieve the tag based on tag_name parameter
    @ticket = @current_user.tickets.build(ticket_params)
    @ticket.tag = tag
    
    @ticket.version = Version.order(created_at: :desc).first

    if @ticket.save
      render json: @ticket, status: :created, location: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /tickets/1
  def update
    if @ticket.update(ticket_params)
      render json: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tickets/1
  def destroy
    @ticket.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    def check_admin_power
      unless @current_user.power == 'admin'
        render json: { error: 'Access denied' }, status: :forbidden
      end
    end

    # Only allow a list of trusted parameters through.
    def ticket_params
      params.permit(:user_id, :tag_id, :subject, :body, :is_resolved, :tag_name, :version)
    end
    
end
