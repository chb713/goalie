import fs from 'fs'
import readline from 'readline'
import { League } from './models'

function readInput(path) {
	const league = new League()
	const rl = readline.createInterface({
		input: path ? fs.createReadStream(path) : process.stdin,
		output: process.stdout,
	})

	rl.prompt()

	rl.on('line', (input) => {
		league.addMatch(input)
		return
	})

	rl.on('close', () => {
		// "If the streaming data is interrupted in the middle of a matchday, that matchday should be considered as ended."
		league.closeDay()
		return
	})
}

export async function cli(args) {
	const options = {
		input: args[2],
	}
	readInput(options.input)
}
