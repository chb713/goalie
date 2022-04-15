import Team from './team'

class Match {
	constructor(teams, data) {
		this.isValid = false

		const results = data.match(
			/([A-z\s]*)\s{1,}(\d{1,}),\s{1,}([A-z\s]*)\s(\d{1,})/
		)
		if (results && results.length > 4) {
			this.teams = teams
			let team1 = this.findTeam(results[1])
			team1.score = parseInt(results[2])

			let team2 = this.findTeam(results[3])
			team2.score = parseInt(results[4])

			this.result = this.calculatePoints(team1, team2)
			this.isValid = Array.isArray(this.result) && this.result.length == 2
			delete this.teams
		}
	}

	findTeam(name) {
		let team = this.teams.filter((team) => team.name === name)[0]
		if (!team) {
			team = new Team(name)
			this.teams.push(team)
		}
		return team
	}

	calculatePoints(team1, team2) {
		const sorted = [team1, team2].sort((a, b) => {
			return b.score - a.score
		})
		const isDraw = sorted[0].score == sorted[1].score

		sorted[0].points += isDraw ? 1 : 3
		sorted[1].points += isDraw ? 1 : 0

		const result = [
			{ team: sorted[0].name, score: sorted[0].score },
			{ team: sorted[1].name, score: sorted[1].score },
		]

		delete sorted[0].score
		delete sorted[1].score

		return result
	}
}

export default Match
