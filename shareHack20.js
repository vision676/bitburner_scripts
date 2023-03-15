/** @param {NS} ns **/
export async function main(ns) {
	var targetFromCheck = ns.args[0]
	const allServersFetch = ns.read("allservers.txt")
	let allServers = allServersFetch.split(",")
	for (let data of allServers) {
		ns.print(data)
		await ns.sleep(100)
		if (data === "home" || data === "") {
			continue
		} else if (ns.scriptRunning("targetWeaken.js", data)) {
			ns.scriptKill("targetWeaken.js", data)
		}

	}
	const programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
	var programCount = 0
	async function countPrograms(ns, programList) {
		programCount = 0
		for (let p of programList) {
			if (ns.fileExists(p, "home")) {
				programCount++
			}
		}
	}
	while (true) {
		const allServersFetch = ns.read("allservers.txt")
		let allServers = allServersFetch.split(",")
		programCount = 0
		await countPrograms(ns, programs)

		for (let server of allServers) {
			if (server === "") {
				break
			} else {
				let checkedServer = [[server],
				[ns.getServerNumPortsRequired(server)],
				[ns.getServerRequiredHackingLevel(server)], ns.getServerMaxRam(server)]
				ns.print(checkedServer)
				await countPrograms(ns, programs)
				await hackServers(ns, checkedServer, programs, programCount, targetFromCheck)
			}
		}


		async function hackServers(ns, serverList, programList, programCount, target) {
			for (let data of serverList) {
				if (ns.getHackingLevel() >= serverList[0, 2]
					&& serverList[0, 3] > 0 && serverList[0, 1] <= programCount) {
					await ns.scp("targetWeaken.js", serverList[0].toString())
					ns.run("cracker.js", 1, serverList[0].toString())
					await ns.sleep(100)
					ns.exec("targetWeaken.js", serverList[0].toString(), serverList[0, 3]
						/ ns.getScriptRam("targetWeaken.js"), targetFromCheck)
					serverList.shift()
				} else {

					continue
				}
			}
		}
		await ns.sleep(10)
	}
}