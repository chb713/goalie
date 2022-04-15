import Leaderboard from './leaderboard'
import Match from './match'
import Team from './team'

class League {
	constructor() {
		this.leaderboard = new Leaderboard()
	}

	static teams = []
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

	addMatch(data) {
		const match = new Match(data)
		this.leaderboard.addMatch(match)
	}

	closeDay() {
		this.leaderboard.close()
	}
}

export default League
