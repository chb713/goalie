import Leaderboard from './leaderboard'
import Match from './match'
import Team from './team'

class League {
	constructor() {
		this.hasLeaderboard = false
		this.matchday = {
			teams: new Set(),
			matches: [],
		}
		this.reset()
	}

	static teams = []
	static findTeam(name) {
		let team = this.teams.filter((team) => team.name === name)[0]
		if (!team) {
			team = new Team(name)
			this.teams.push(team)
		}
		return team
	}

	addMatch(data) {
		const match = new Match(data)
		if (!match.isValid) {
			// "Invalid input lines should be skipped."
			return
		}

		if (match.teams.some((team) => this.hasSeenTeamToday(team.name))) {
			// We're seen our hint that a new day has started, so end the day, and show the first leaderboard
			this.endMatchDay()
			this.processMatch(match)
		} else if (this.matchday.matches.length < League.teams.length / 2) {
			// We're in the middle of a matchday, so just process this new match
			this.processMatch(match)
		} else {
			// We have hit our known match/team set size, so calculate points, end the day, and show the leaderboard
			this.processMatch(match)
			this.endMatchDay()
		}
	}

	processMatch(match) {
		// Calculate each team's points for this match
		match.addPoints()

		// Add this match to the current matchday for reference
		this.matchday.matches.push(match)

		// Add this match's teams to the set of teams seen today
		match.teams.forEach((team) => {
			this.matchday.teams.add(team.name)
		})
	}

	endMatchDay() {
		const leaderboard = new Leaderboard(
			`Matchday ${this.day}`,
			League.teams
		)
		console.log(leaderboard.toString())
		this.hasLeaderboard = true
		this.reset(this.day + 1)
	}

	reset(day = 1) {
		this.day = day
		this.matchday.teams.clear()
		this.matchday.matches.length = 0
	}

	hasSeenTeamToday(name) {
		return this.matchday.teams.has(name)
	}
}

export default League
