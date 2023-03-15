/** @param {NS} ns */
export async function main(ns) {
	let allServers = []
	let nextServers = []
	let currentServer = "home"

	await scanner(ns, allServers, currentServer, nextServers)

	async function scanner(ns, previous, current, next) {
		next = next.concat(ns.scan(current))
		previous.push(current)
		for (let s of previous) {
			if (previous.indexOf(next[0]) == -1) {
				previous.concat(current)
				current = next[0]
				next.shift()
				await scanner(ns, previous, current, next)
			} else {
				next.shift()
				current = next[0]
				previous.concat(next[0])
			}
			
		}
		allServers = previous

		//in String umwandeln
		allServers = allServers.toString()
		await ns.write("allservers.txt", allServers, "w")
	}

}
