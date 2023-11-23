class PasswordResetsController < ApplicationController
    before_action :authorize, except: [:new, :create]

  
    def create
      @user = User.find_by(email: params[:email])
      puts "🚨🚨🚨 #{params[:email]} 🚨🚨🚨"
      puts "🚨🚨🚨 #{@user} 🚨🚨🚨"
  
      if @user.present? # Removed unnecessary parentheses here
        # send email
        PasswordMailer.with(user: @user).password_reset.deliver_now
      end
      
    end
  end
  