class AddTodoGroupIdToTodos < ActiveRecord::Migration
  def change
    add_column :todos, :todo_group_id, :integer
  end
end
