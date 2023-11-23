class AddUntoggledAndToggledNamesToThemes < ActiveRecord::Migration[6.0]
  def change
    add_column :themes, :untoggled_name, :string, default: "BEFORE"
    add_column :themes, :toggled_name, :string, default: "AFTER"
  end
end
