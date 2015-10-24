json.array!(@musicians) do |musician|
  json.extract! musician, :id, :instrument, :status, :sponsor
  json.url musician_url(musician, format: :json)
end
