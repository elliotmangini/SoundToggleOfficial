class PasswordResetsController < ApplicationController
  before_action :authorize, except: [:new, :create]

  def create
    @user = User.find_by(email: params[:email])

    if @user.present?
      PasswordMailer.password_reset(@user).deliver_now
    end
  end
end
