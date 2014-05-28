json.array!(@todos) do |todo|
  json.extract! todo, :id, :title, :complete, :todo_group_id
  json.url todo_url(todo, format: :json)
end
