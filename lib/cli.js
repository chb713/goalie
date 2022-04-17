import fs from 'fs'
import readline from 'readline'
import { League } from './models'

/**
 * Creates a command line interface for Goalie.
 * @param    {Array} args    The arguments passed to the command.
 */
export async function cli(args) {
	const options = {
		path: args[2],
	}
	const rl = readline.createInterface({
		input: options.path ? fs.createReadStream(options.path) : process.stdin,
		output: process.stdout,
	})
	const league = new League()

	rl.prompt()

	rl.on('line', (input) => {
		// Every time there is a new line, attempt to process the line as a match result
		league.addMatch(input)
		return
	})

	rl.on('close', () => {
		// "If the streaming data is interrupted in the middle of a matchday
		// that matchday should be considered as ended."
		league.closeDay()
		return
	})
}
