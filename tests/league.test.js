import { League } from '../lib/models'

describe('League', () => {
	const league = new League()

	test('Creates a default leaderboard', () => {
		expect(league.leaderboard).not.toBe(null)
	})

	test('Creates a new team', () => {
		const team1 = League.findTeam('Foo Bar FC')

		expect(team1.name).toBe('Foo Bar FC')
	})

	test('Finds an existing team without creating a new team', () => {
		const team = League.findTeam('Foo Bar FC')

		expect(team.name).toBe('Foo Bar FC')
		expect(League.teams.length).toBe(1)
	})

	test('Persists a list of league teams', () => {
		League.findTeam('Team 2')
		League.findTeam('Team 3')
		League.findTeam('Team 4')
		League.findTeam('Team 5')
		League.findTeam('Team 6')
		expect(League.teams.length).toBe(6)
	})

	test('Adds a valid match to the leaderboard', () => {
		league.addMatch('Aptos FC 2, Monterey United 0')
		expect(league.leaderboard.matches.length).toBe(1)
	})

	test('Closes the matchday out properly', () => {
		league.closeDay()
		expect(league.leaderboard.teams.length).toBe(0)
		expect(league.leaderboard.matches.length).toBe(0)
	})
})
