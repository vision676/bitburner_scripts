/** @param {NS} ns **/
export async function main(ns) {
	let allServers = new Set()
	let previous = []
	let next = []
	let current = ns.getHostname()

	await scanner(ns, previous, current, next)

	async function scanner(ns, prevServers, currentServer, nextServers) {
		next = next.concat(ns.scan(currentServer))
		allServers.add(currentServer)
		for (let i of allServers) {
			if (previous.indexOf(next[0]) == -1) {
				previous.push(currentServer)
				current = next[0]
				next.shift()
				await ns.sleep(10)
				await scanner(ns, previous, current, next)
			} else {
				next.shift()
				current = next[0]
				allServers = allServers.add(next[0])
				


			}
		}


	}
allServers = [...allServers]
await ns.write("allservers.txt", allServers, "w")
}