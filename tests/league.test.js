import { League, Match } from '../lib/models'

describe('League', () => {
	const league = new League()

	test('Sets default leaderboard', () => {
		expect(league.leaderboard).not.toBe(null)
	})

	test('Creates new teams on unsuccessful find', () => {
		const team1 = League.findTeam('Foo')
		const team2 = League.findTeam('Bar')

		expect(team1.name).toBe('Foo')
		expect(team2.name).toBe('Bar')
	})

	test('Persists list of league teams', () => {
		expect(League.teams.length).toBe(2)
	})

	test('Returns an existing team on successful find', () => {
		const team = League.findTeam('Foo')

		expect(team.name).toBe('Foo')
		expect(League.teams.length).toBe(2)
	})

	test('Adds a valid match to the leaderboard', () => {
		const match = league.addMatch('Aptos FC 2, Monterey United 0')

		expect(match.isValid).toBe(true)
		expect(league.leaderboard.matches.length).toBe(1)
	})

	test('Closes the matchday out properly', () => {
		league.closeDay()
		expect(league.leaderboard.teams.length).toBe(0)
		expect(league.leaderboard.matches.length).toBe(0)
	})
})
