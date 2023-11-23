class AddFoundUsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :found_us, :string
  end
end
