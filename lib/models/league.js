import Leaderboard from './leaderboard'
import Match from './match'

class League {
	constructor(output, leaderboardSize = 3) {
		this.teams = []
		this.output = output
		this.leaderboardSize = leaderboardSize
		this.reset()
	}

	addMatch(data) {
		const match = new Match(this.teams, data)

		if (!match.isValid) return
		this.today.matches.push(match)

		match.result.forEach((item) => {
			this.today.teams.add(item.team)
		})

		if (
			this.teams.length >= this.leaderboardSize &&
			this.today.teams.size >= this.leaderboardSize * 2
		) {
			this.endMatchDay()
		}
	}

	endMatchDay() {
		this.leaderboard = new Leaderboard(
			`Matchday ${this.day}`,
			this.leaderboardSize,
			this.teams
		)
		this.showLeaderboard()
		this.reset(this.day + 1)
	}

	showLeaderboard() {
		this.output.write(this.leaderboard.toString())
	}

	disconnected() {
		if (this.today.matches.length > 0) {
			this.endMatchDay()
		}
	}

	reset(day = 1) {
		this.day = day
		this.today = {
			teams: new Set(),
			matches: [],
		}
	}
}

export default League
