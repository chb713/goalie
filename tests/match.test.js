import { Match } from '../lib/models'

describe('Match', () => {
	test('Creates a new Match from valid data', () => {
		const match = new Match('Aptos FC 5, Monterey United 0')

		expect(match.isValid).toBe(true)
		expect(match.teams.length).toBe(2)
		expect(match.teams[0].name).toBe('Aptos FC')
		expect(match.teams[0].score).toBe(5)
	})

	test('Does not create a valid Match from invalid data', () => {
		const match = new Match('qeIBYVyIwlxSXbmOgxrj_++2w  ,18eq0')

		expect(match.isValid).toBe(false)
		expect(match.teams.length).toBe(0)
	})

	test('Processes a valid raw match string', () => {
		const match = new Match('fy9c8has980 70afsvk ,, 1r3 2++ ')
		expect(match.isValid).toBe(false)

		match.process('Monterey United 4, San Jose Earthquakes 2')
		expect(match.isValid).toBe(true)
	})

	test('Processes a valid raw match string that is a draw', () => {
		const match = new Match('Monterey United 2, San Jose Earthquakes 2')
		expect(match.isValid).toBe(true)
		expect(match.isDraw).toBe(true)
	})

	test('Processes a valid match', () => {
		const match = new Match('Monterey United 4, San Jose Earthquakes 2')

		expect(match.isValid).toBe(true)
		expect(match.outcome.length).toBe(2)
	})

	test('Processes a match that is a draw', () => {
		const match = new Match('San Jose Earthquakes 3, Santa Cruz Slugs 3')

		expect(match.isValid).toBe(true)
		expect(match.isDraw).toBe(true)
		expect(match.teams[0].score).toBe(3)
		expect(match.teams[1].score).toBe(3)
		expect(match.outcome.length).toBe(2)
	})

	test('Does not process an invalid match', () => {
		const match = new Match('afafasf321__=,      1122112dcasiug2w 18eq0')

		expect(match.isValid).toBe(false)
		expect(match.outcome).toBe(undefined)
	})

	test('Verifies that a match has a team', () => {
		const match = new Match('Monterey United 4, San Jose Earthquakes 2')

		expect(match.isValid).toBe(true)
		expect(match.hasTeam('San Jose Earthquakes')).toBe(true)
	})
})
