import League from './league'

class Match {
	constructor(data) {
		this.isValid = false
		this.isDraw = false
		this.teams = []
		this.process(data)
	}

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
			this.isValid = true
			this.isDraw = this.teams[0].score == this.teams[1].score
		} else {
			this.isValid = false
		}
	}

	hasTeam(name) {
		return (
			this.teams.filter(
				(team) => team.name.toLowerCase() === name.toLowerCase()
			)[0] != null
		)
	}

	addPoints() {
		this.teams[0].points += this.isDraw ? 1 : 3
		this.teams[1].points += this.isDraw ? 1 : 0

		delete this.teams[0].score
		delete this.teams[1].score
	}
}

export default Match
