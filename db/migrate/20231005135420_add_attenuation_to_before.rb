class AddAttenuationToBefore < ActiveRecord::Migration[7.0]
  def change
    add_column :befores, :attenuation, :decimal, precision: 4, scale: 1, default: 0
  end
end
