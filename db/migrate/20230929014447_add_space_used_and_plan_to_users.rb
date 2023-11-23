class AddSpaceUsedAndPlanToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :space_used, :bigint, default: 0, null: false
    add_column :users, :plan, :integer, default: 0, null: false
  end
end