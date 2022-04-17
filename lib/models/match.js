import { League } from './'

/** Class representing a football match result. */
class Match {
	/**
	 * Creates a new match.
	 * @param    {String} data    The raw match result input string to parse.
	 */
	constructor(data) {
		this.isValid = false
		this.isDraw = false
		this.teams = []
		this.process(data)
	}

	/**
	 * Processes a match string into a match object.
	 * @param    {String} data    The raw match result input string to parse.
	 */
	process(data) {
		const results = data.match(
			/([A-z\s]*)\s{1,}(\d{1,}),\s{1,}([A-z\s]*)\s(\d{1,})/
		)

		if (results && results.length > 4) {
			// Use the regex matches to parse out our match result line
			let team1 = League.findTeam(results[1])
			team1.score = parseInt(results[2])
			let team2 = League.findTeam(results[3])
			team2.score = parseInt(results[4])

			// Sort the match based on score
			this.teams = [team1, team2].sort((a, b) => {
				return b.score - a.score
			})

			// Store outcome in a clear structure so we can reference it later
			this.outcome = [
				{ team: this.teams[0].name, score: this.teams[0].score },
				{ team: this.teams[1].name, score: this.teams[1].score },
			]
			this.isDraw = this.teams[0].score == this.teams[1].score // This is a draw if the scores are the same
			this.isValid = true
		} else {
			this.isValid = false
		}
	}

	/**
	 * Determines whether a team exists in this match.
	 * @param    {String} name    The name of the team to check.
	 * @return   {Bool} Boolean representing whether the team exists as a participant in the match.
	 */
	hasTeam(name) {
		return (
			this.teams.filter(
				(team) => team.name.toLowerCase() === name.toLowerCase()
			)[0] != null
		)
	}

	/** Calculates and adds the points assigned to each team in the match. */
	addPoints() {
		this.teams[0].points += this.isDraw ? 1 : 3
		this.teams[1].points += this.isDraw ? 1 : 0

		delete this.teams[0].score
		delete this.teams[1].score
	}
}

export default Match
