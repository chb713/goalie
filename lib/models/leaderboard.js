import League from './league'

/** Class representing a leaderboard for a specific league. */
class Leaderboard {
	/**
	 * Creates a new leaderboard.
	 * @param    {Number} day    The day of the current season, defaults to 1.
	 * @param    {Number} size    The number of ranked teams to include on the leaderboard output, defaults to 3.
	 */
	constructor(day = 1, size = 3) {
		this.day = day
		this.size = size // "The solution should output the top three teams"
		this.teams = []
		this.matches = []
	}

	/**
	 * Adds a match to the leaderboard
	 * @param    {Match} match    The match object to add
	 */
	addMatch(match) {
		if (match.teams.some((team) => this.hasTeam(team.name))) {
			// If we've already seen this team today, the matchday has ended
			this.close()
		}

		this.processMatch(match)
	}

	/**
	 * Processes a match's results for use on the leaderboard
	 * @param    {Match} match    The match object to add
	 */
	processMatch(match) {
		// Calculate the points for each team based on their scores
		match.addPoints()

		// Add the match and the respective teams to this leaderboard
		this.matches.push(match)
		match.teams.forEach((team) => {
			if (!this.hasTeam(team.name)) {
				this.teams.push(team)
			}
		})
	}

	/**
	 * Determines whether a team has already been added to this leaderboard.
	 * @param    {String} name    The name of the team to check.
	 * @return   {Bool} Boolean representing whether the team already exists on the leaderboard.
	 */
	hasTeam(name) {
		if (!name) return false
		return (
			this.teams.filter(
				(team) => team.name.toLowerCase() === name.toLowerCase()
			)[0] != null
		)
	}

	/**
	 * Closes a leaderboard for a given matchday.
	 */
	close() {
		if (this.teams.length > 0) {
			console.log(this.toString())
		}
		this.reset()
	}

	/**
	 * Resets the leaderboard for a new matchday.
	 */
	reset() {
		this.day = this.day + 1
		this.teams.length = 0
		this.matches.length = 0
	}

	/**
	 * Displays the top ranked n teams in a leaderboard for a given matchday as a string.
	 */
	toString() {
		let string = `Matchday ${this.day}\n`

		// Rank the top n teams based on score and name
		this.teams
			.sort((a, b) => {
				return b.points - a.points || a.name.localeCompare(b.name)
			})
			.slice(0, this.size)
			.forEach((team) => {
				string += `${team.name}, ${team.points} pts\n`
			})
		return string
	}
}

export default Leaderboard
