import { Leaderboard, Match } from '../lib/models'

describe('Leaderboard', () => {
	test('Creates a leaderboard with default parameters', () => {
		const leaderboard = new Leaderboard()

		expect(leaderboard.day).toBe(1)
		expect(leaderboard.size).toBe(3)
	})

	test('Processes a valid match result successfully', () => {
		const leaderboard = new Leaderboard()
		const match = new Match('Aptos FC 2, Monterey United 0')

		leaderboard.processMatch(match)
		expect(match.teams[0].name).toBe('Aptos FC')
		expect(match.teams[1].name).toBe('Monterey United')
		expect(match.teams[0].points).toBe(3) // Winner = 3 points
		expect(match.teams[1].points).toBe(0) // Loser = 0 points
	})

	test('Does not have a team when name is null', () => {
		const leaderboard = new Leaderboard()
		const result = leaderboard.hasTeam(null)
		expect(result).toBe(false)
	})

	test('Closes the leaderboard properly', () => {
		const leaderboard = new Leaderboard()
		const match1 = new Match('Aptos FC 2, Monterey United 0')
		const match2 = new Match('Capitola Seahorses 5, San Jose Earthquakes 5')

		leaderboard.addMatch(match1)
		leaderboard.addMatch(match2)
		leaderboard.close()

		expect(leaderboard.teams.length).toBe(0)
		expect(leaderboard.matches.length).toBe(0)
	})

	test('Closes the leaderboard and starts a new matchday when a team has already been seen', () => {
		const leaderboard = new Leaderboard()
		leaderboard.addMatches([
			new Match('Monterey United 4, San Jose Earthquakes 3'),
			new Match('Capitola Seahorses 2, Santa Cruz Slugs 4'),
			new Match('Monterey United 1, Felton Lumberjacks 1'),
		])

		expect(leaderboard.day).toBe(2)
		expect(leaderboard.teams.length).toBe(2)
		expect(leaderboard.matches.length).toBe(1)
	})

	test('Supports any number of teams in a league', () => {
		const leaderboard = new Leaderboard()

		leaderboard.addMatches([
			new Match('Monterey United 4, San Jose Earthquakes 3'),
			new Match('Capitola Seahorses 2, Santa Cruz Slugs 4'),
			new Match('Aptos FC 1, Felton Lumberjacks 1'),
			new Match('Sonoma Sol 5, Oakland Roots 2'),
			new Match('Cupertino FC 3, Sacramento Republic FC 6'),
			new Match('Sonoma Sol 5, Oakland Roots 2'),
		])

		expect(leaderboard.day).toBe(2)
		expect(leaderboard.teams.length).toBe(2)
		expect(leaderboard.matches.length).toBe(1)
	})
})
