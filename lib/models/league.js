import Match from './match'

class League {
	constructor(rl) {
		this.rl = rl
		this.day = 1
		this.teamsToday = new Set()
		this.teams = []
		this.matches = []
	}

	addMatch(data) {
		const match = new Match(this.teams, data)

		if (match.isValid) {
			this.matches.push(match)

			match.result.forEach((item) => {
				this.teamsToday.add(item.team)
			})

			if (this.teams.length >= 3 && this.teamsToday.size >= 6) {
				this.endMatchDay()
			}
		}
	}

	endMatchDay() {
		this.showLeaderboard()
		this.matches = []
		this.teamsToday = new Set()
		this.day++
	}

	showLeaderboard() {
		let output = `Matchday ${this.day}\n`
		const teams = this.teams
			.sort((a, b) => {
				return b.points - a.points || a.name - b.name
			})
			.slice(0, 3)
		teams.forEach((team) => {
			output += `${team.name}, ${team.points} pts\n`
		})
		output += `\n`
		this.rl.write(output)
	}
}

export default League
