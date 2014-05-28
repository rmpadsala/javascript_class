json.array!(@todo_groups) do |group|
  json.extract! group, :id, :name
  json.url todo_group_url(group, format: :json)
end
