# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

musician_list = [
	['violin I', false],
	['violin I', true],
	['violin I', false],
	['violin I', true],
	['violin I', true],
	['violin I', false],
	['violin I', true],
	['violin I', true],
	['violin I', true],
	['violin I', true],
	['violin II', false],
	['violin II', true],
	['violin II', true],
	['violin II', false],
	['violin II', true],
	['violin II', true],
	['violin II', true],
	['violin II', true],
	['viola', false],
	['viola', true],
	['viola', true],
	['viola', false],
	['viola', false],
	['viola', false],
	['viola', false],
	['viola', true],
	['cello', false],
	['cello', true],
	['cello', false],
	['cello', false],
	['cello', true],
	['cello', true],
	['bass', false],
	['bass', true],
	['bass', true],
	['bass', true],
	['flute', true],
	['flute', true],
	['flute', true],
	['oboe', false],
	['oboe', true],
	['oboe', true],
	['clarinet', true],
	['clarinet', true],
	['clarinet', false],
	['bassoon', true],
	['bassoon', true],
	['bassoon', true],
	['horn', false],
	['horn', true],
	['horn', true],
	['horn', true],
	['trumpet', true],
	['trumpet', true],
	['trumpet', true],
	['trombone', false],
	['trombone', true],
	['trombone', true],
	['tuba', true],
	['harp', false],
	['keyboard', true],
	['percussion', true],
	['percussion', true],
	['percussion', true],
	['percussion', true]
]

musician_list.each do |name, bool|
	Musician.create(instrument: name, status: false, student: bool)
end