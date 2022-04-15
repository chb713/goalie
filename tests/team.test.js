import { Team } from '../lib/models'

describe('Team', () => {
	const team = new Team('Foo', 100)

	test('Takes name as a construction param', () => {
		expect(team.name).toBe('Foo')
	})

	test('Takes points as a construction param', () => {
		expect(team.points).toBe(100)
	})

	test('Takes a score as a property', () => {
		team.score = 5
		expect(team.score).toBe(5)
	})
})
