class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create
  
    def create
      user = User.find_by(username: params[:username])
      if user&.authenticate(params[:password])
        puts 'user id:'
        puts user.id
        puts 'session[:user_id] = user.id'
        session[:user_id] = user.id
        puts 'session[:user_id]:'
        puts session[:user_id]
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