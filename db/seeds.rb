# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

musician_list = [
	['violin', 4],
	['viola', 3],
	['trombone', 1]
]

musician_list.each do |name, quantity|
	quantity.times do Musician.create(instrument: name, status: false)
	end
end