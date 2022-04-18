import { Leaderboard, Match, Team } from './'

/** Class representing a football league. */
class League {
	/** Creates a new league. */
	constructor() {
		this.leaderboard = new Leaderboard()
	}

	static teams = []

	/**
	 * Finds or creates a team that is a member of the league.
	 * @param    {String} name    The name of the team to find.
	 * @return   {Team} Team object representing the given team.
	 */
	static findTeam(name) {
		let team = this.teams.filter(
			(team) => team.name.toLowerCase() === name.toLowerCase()
		)[0]
		if (!team) {
			team = new Team(name)
			this.teams.push(team)
		}
		return team
	}

	/**
	 * Adds a new match result to the league.
	 * @param    {String} data    The match result input to process.
	 * @return   {Match} Match object representing the match result input.
	 */
	addMatch(data) {
		try {
			this.leaderboard.addMatch(new Match(data))
		} catch {
			// Invalid input should be skipped entirely.
		}
	}

	/**
	 * Closes the league's current leaderboard & matchday.
	 */
	closeDay() {
		this.leaderboard.close()
	}
}

export default League
