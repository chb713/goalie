class Leaderboard {
	constructor(day = 1, size = 3) {
		this.day = day
		this.size = size
		this.teams = []
		this.matches = []
	}

	addMatch(match) {
		if (!match.isValid) {
			// "Invalid input lines should be skipped."
			return
		}

		this.processMatch(match)
		switch (true) {
			case this.matches.length == this.size:
				this.close()
				break
			default:
				break
		}
	}

	processMatch(match) {
		// Calculate each team's points for this match
		match.addPoints()

		// Add this match to the current list for reference
		this.matches.push(match)

		// Add this match's teams to the set of teams seen today
		match.teams.forEach((team) => this.teams.push(team))

		// Rank the top 3 teams based on score and name
		this.top = this.teams
			.sort((a, b) => {
				return b.points - a.points || a.name.localeCompare(b.name)
			})
			.slice(0, this.size)
	}

	close() {
		if (this.teams.length > 0) {
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
		string += `\n`
		return string
	}
}

export default Leaderboard
