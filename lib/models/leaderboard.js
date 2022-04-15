class Leaderboard {
	constructor(title, teams, size = 3) {
		this.title = title
		this.size = size

		if (!Array.isArray(teams) || teams.length < size) {
			this.teams = []
			return
		}

		this.teams = teams
			.sort((a, b) => {
				return b.points - a.points || a.name.localeCompare(b.name)
			})
			.slice(0, size)
	}

	toString() {
		let string = `${this.title}\n`
		this.teams.forEach((team) => {
			string += `${team.name}, ${team.points} pts\n`
		})
		string += `\n`
		return string
	}
}

export default Leaderboard
