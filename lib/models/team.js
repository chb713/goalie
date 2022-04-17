/** Class representing a team inside of a league. */
class Team {
	/**
	 * Creates a new team.
	 * @param    {String} name    The name of the team.
	 * @param    {Number} points    The points that the team has in the current season.
	 */
	constructor(name, points = 0) {
		this.name = name
		this.points = points
	}
}

export default Team
