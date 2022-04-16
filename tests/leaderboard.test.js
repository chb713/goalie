import { Leaderboard, Match } from '../lib/models'

describe('Leaderboard', () => {
	test('Creates a leaderboard with default parameters', () => {
		const leaderboard = new Leaderboard()

		expect(leaderboard.day).toBe(1)
		expect(leaderboard.size).toBe(3)
	})

	test('Does not add an invalid match', () => {
		const leaderboard = new Leaderboard()
		const match = new Match('fweq 7g80sdphiu o[90iqw++-r   q4390 ui')
		leaderboard.addMatch(match)

		expect(leaderboard.teams.length).toBe(0)
		expect(leaderboard.matches.length).toBe(0)
	})

	test('Processes a valid Match successfully', () => {
		const leaderboard = new Leaderboard()
		const match = new Match('Aptos FC 2, Monterey United 0')

		leaderboard.processMatch(match)
		expect(match.teams[0].points).toBe(3)
		expect(match.teams[1].points).toBe(0)
	})

	test('Does not have a team when name is null', () => {
		const leaderboard = new Leaderboard()
		const result = leaderboard.hasTeam(null)
		expect(result).toBe(false)
	})

	test('Closes the leaderboard', () => {
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
		const match1 = new Match('Monterey United 4, San Jose Earthquakes 3')
		const match2 = new Match('Capitola Seahorses 2, Santa Cruz Slugs 4')
		const match3 = new Match('Monterey United 1, Felton Lumberjacks 1')
		leaderboard.addMatch(match1)
		leaderboard.addMatch(match2)
		leaderboard.addMatch(match3)

		expect(leaderboard.teams.length).toBe(2)
		expect(leaderboard.matches.length).toBe(1)
	})

	test('After closing the leaderboard, values are empty', () => {
		const leaderboard = new Leaderboard()
		const match = new Match('Monterey United 4, San Jose Earthquakes 3')
		leaderboard.addMatch(match)
		leaderboard.close()
		leaderboard.close()

		expect(leaderboard.teams.length).toBe(0)
		expect(leaderboard.matches.length).toBe(0)
	})

	test('Closes the leaderboard and starts a new matchday when all teams have been seen', () => {
		const leaderboard = new Leaderboard()
		const match1 = new Match('Aptos FC 2, Monterey United 0')
		const match2 = new Match('Capitola Seahorses 5, San Jose Earthquakes 5')
		const match3 = new Match('Santa Cruz Slugs 1, Felton Lumberjacks 1')

		leaderboard.addMatch(match1)
		leaderboard.addMatch(match2)
		leaderboard.addMatch(match3)

		expect(leaderboard.teams.length).toBe(0)
		expect(leaderboard.matches.length).toBe(0)
	})
})
