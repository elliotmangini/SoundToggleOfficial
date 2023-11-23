class AddAttenuationToAfter < ActiveRecord::Migration[7.0]
  def change
    add_column :afters, :attenuation, :decimal, precision: 4, scale: 1, default: -6
  end
end
