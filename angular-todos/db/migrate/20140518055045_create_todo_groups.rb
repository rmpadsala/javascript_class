class CreateTodoGroups < ActiveRecord::Migration
  def change
    create_table :todo_groups do |t|
      t.string :name

      t.timestamps
    end
  end
end
