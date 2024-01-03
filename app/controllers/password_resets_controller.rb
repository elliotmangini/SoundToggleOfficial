class PasswordResetsController < ApplicationController
  skip_before_action :authorize

  def create
    @user = User.find_by(email: params[:email])

    if @user.present?
      @user.generate_password_reset_token
      PasswordMailer.password_reset(@user).deliver_now
    end
  end

  def accept
    @user = User.find_by(password_reset_token: params[:password_reset_token])
    
    if @user && !@user.password_reset_token_expired?
      if params[:password].blank?
        render plain: 'Ready for new password.', status: :unprocessable_entity
      elsif params[:password] == params[:password_confirmation]
        # Now you can set the new password for the user
        if @user.update(password: params[:password])
          @user.update(password_reset_token: nil) # Clear the reset token
          render plain: 'Password successfully updated.', status: :ok
        else
          render plain: "Password update failed: #{humanize_errors(@user.errors)}", status: :unprocessable_entity
        end
      else
        render plain: 'Passwords do not match', status: :unprocessable_entity
      end
    else
      render plain: 'Token not found, already used, or expired.', status: :not_found
    end
  end
  
  private
  
  def humanize_errors(errors)
    errors.full_messages.to_sentence
  end
end