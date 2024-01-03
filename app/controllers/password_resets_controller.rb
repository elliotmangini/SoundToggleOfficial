class PasswordResetsController < ApplicationController
    before_action :authorize, except: [:new, :create]

  
    def create
      @user = User.find_by(email: params[:email])
      puts "🚨🚨🚨 #{params[:email]} 🚨🚨🚨"
      puts "🚨🚨🚨 #{@user} 🚨🚨🚨"
  
      if @user.present?
        @user.generate_password_reset_token
        PasswordMailer.with(user: @user).password_reset.deliver_now
      end
    end
    
  end
  