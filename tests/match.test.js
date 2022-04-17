import { Match } from '../lib/models'

describe('Match', () => {
	test('Creates a new match from valid input', () => {
		const match = new Match('Monterey United 4, San Jose Earthquakes 2')

		expect(match).not.toBe(null)
		expect(match.outcome.length).toBe(2)
		expect(match.teams[0].name).toBe('Monterey United')
		expect(match.teams[0].score).toBe(4)
		expect(match.teams[1].name).toBe('San Jose Earthquakes')
		expect(match.teams[1].score).toBe(2)
	})

	test('Does not create a new match from invalid input', () => {
		expect(() => {
			new Match('afafasf321__=,      1122112dcasiug2w 18eq0')
		}).toThrow('Not a valid match result.')
	})

	test('Does not create a new match from an empty string', () => {
		expect(() => {
			new Match('')
		}).toThrow('Not a valid match result.')
	})

	test('Processes a match that is a draw', () => {
		const match = new Match('Monterey United 2, San Jose Earthquakes 2')

		expect(match).not.toBe(null)
		expect(match.isDraw).toBe(true)
	})

	test('Verifies that a match has a team', () => {
		const match = new Match('Monterey United 4, San Jose Earthquakes 2')

		expect(match).not.toBe(null)
		expect(match.hasTeam('San Jose Earthquakes')).toBe(true)
	})
})
