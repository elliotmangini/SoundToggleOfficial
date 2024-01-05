class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create
  
    def create
      login_identifier = params[:username].include?('@') ? :email : :username
      user = User.find_by(login_identifier => params[:username])
    
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user, include: ['songs.before', 'songs.after']
      else
        render json: { errors: ["Invalid username or password"] }, status: :unauthorized
      end
    end
  
    def destroy
      session.delete :user_id
      head :no_content
    end
  
  end