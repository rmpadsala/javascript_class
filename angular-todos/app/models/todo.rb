class Todo < ActiveRecord::Base
  belongs_to :todo_group 
  validates :title, uniqueness: true

end
