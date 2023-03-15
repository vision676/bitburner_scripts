/** @param {NS} ns **/
export async function main(ns) {
	let servs = ns.getPurchasedServers()

	for (let s of servs) {
		switch (ns.scriptRunning("targetHack.js", s)) {
			case true:
				ns.scriptKill("targetHack.js", s)
				break
			case false:
				ns.deleteServer(s)
				break
		}
		await ns.sleep(19)
	}
}