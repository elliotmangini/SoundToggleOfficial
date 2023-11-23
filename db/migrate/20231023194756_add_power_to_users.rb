class AddPowerToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :power, :string, default: "free"
  end
end
