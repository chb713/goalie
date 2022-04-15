import League from './league'

class Leaderboard {
	constructor(day = 1, size = 3) {
		this.day = day
		this.size = size // "The solution should output the top three teams"
		this.teams = []
		this.top = []
		this.matches = []
	}

	addMatch(match) {
		if (!match.isValid) {
			// "Invalid input lines should be skipped."
			return
		}
		if (match.teams.some((team) => this.hasTeam(team.name))) {
			// If we've already seen this team today, the matchday has ended
			this.close()
		}

		this.processMatch(match)
		if (
			this.teams.length == League.teams.length &&
			this.matches.length == this.size
		) {
			// If we've seen all the teams and we have enough matches to do a leaderboard,
			// show the it now so we don't have to wait for the next result to come in.
			this.close()
		}
	}

	processMatch(match) {
		match.addPoints()
		this.matches.push(match)
		match.teams.forEach((team) => {
			this.hasTeam(team.name) ? null : this.teams.push(team)
		})
	}

	hasTeam(name) {
		if (!name) return false
		return (
			this.teams.filter(
				(team) => team.name.toLowerCase() === name.toLowerCase()
			)[0] != null
		)
	}

	close() {
		if (this.teams.length > 0) {
			// Rank the top N teams based on score and name
			this.top = this.teams
				.sort((a, b) => {
					return b.points - a.points || a.name.localeCompare(b.name)
				})
				.slice(0, this.size)
			console.log(this.toString())
		}
		this.reset()
	}

	reset() {
		this.day = this.day + 1
		this.teams.length = 0
		this.top.length = 0
		this.matches.length = 0
	}

	toString() {
		let string = `Matchday ${this.day}\n`
		this.top.forEach((team) => {
			string += `${team.name}, ${team.points} pts\n`
		})
		return string
	}
}

export default Leaderboard
