class CreateMusicians < ActiveRecord::Migration
  def change
    create_table :musicians do |t|
      t.string :instrument
      t.boolean :status
      t.string :sponsor

      t.timestamps
    end
  end
end
