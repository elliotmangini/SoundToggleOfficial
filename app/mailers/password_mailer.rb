class PasswordMailer < ApplicationMailer

  def password_reset(user)
    @user = user
    mail(to: @user.email, subject: 'SoundToggle Password Reset') if @user.present?
  end

end