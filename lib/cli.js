import fs from 'fs'
import readline from 'readline'
import { League } from './models'

function readInput(path) {
	const input = path ? fs.createReadStream(path) : process.stdin
	const rl = readline.createInterface({
		input,
		output: process.stdout,
	})
	const league = new League(rl)

	rl.prompt()

	rl.on('line', (input) => {
		league.addMatch(input)
		return
	})

	rl.on('SIGINT', () => {
		league.disconnected()
		rl.close()
		return
	})
}

export async function cli(args) {
	const options = {
		input: args[2],
	}
	readInput(options.input)
}
