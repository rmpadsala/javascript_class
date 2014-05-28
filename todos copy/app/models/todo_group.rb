class TodoGroup < ActiveRecord::Base
  has_many :todos, dependent: :destroy

  validates :name, uniqueness: true
end
