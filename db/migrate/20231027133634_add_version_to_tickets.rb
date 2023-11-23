class AddVersionToTickets < ActiveRecord::Migration[7.0]
  def change
    add_reference :tickets, :version, foreign_key: true
  end
end
