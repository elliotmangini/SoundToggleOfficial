class PasswordMailer < ApplicationMailer
  def password_reset
    mail(to: @user.email, subject: 'SoundToggle Password Reset') if @user.present?
  end
end
