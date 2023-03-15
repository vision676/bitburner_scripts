/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		var checkedServer = []
		var tweakTime = 600000

		var remoteServers = ns.getPurchasedServers()
		var remoteServersCount = remoteServers.length
		const allServersFetch = ns.read("allservers.txt")
		let allServers = allServersFetch.split(",")
		let host = "home"

		let availableRam = (ns.getServerMaxRam(host) - ns.getServerUsedRam(host) - 10)
		var scriptRam = ns.getScriptRam("targetHack.js")
		let calculatedThreads = Math.floor(availableRam / scriptRam)

		const programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
		var programCount = 0

		if (ns.scriptRunning("targetHack.js", "home")) {
			ns.scriptKill("targetHack.js", "home")
		}
		if (remoteServersCount >= 1) {
			for (let s of remoteServers) {
				ns.scriptKill("targetHack.js", s)
				await ns.sleep(10)
			}
		}
		if (ns.scriptRunning("shareHack20.js", "home")) {
			ns.scriptKill("shareHack20.js", "home")
			await ns.sleep(10)

		}

		async function countPrograms(ns, programList) {
			programCount = 0
			for (let p of programList) {
				if (ns.fileExists(p, "home")) {
					programCount++
				}
			}
		}

		for (let server of allServers) {
			checkedServer.push([server, ns.getServerMaxMoney(server),
				ns.getServerNumPortsRequired(server),
				ns.getServerRequiredHackingLevel(server),
				ns.getServerMaxMoney(server) /
				((ns.getWeakenTime(server)
					+ ns.getGrowTime(server)
					+ ns.getHackTime(server)) / 3)
				* ns.hackAnalyzeChance(server)
				* ns.hackAnalyze(server)
				, ns.getWeakenTime(server)])
			ns.print(checkedServer)
			allServers.shift()
			await ns.sleep(10)
		} checkedServer.sort(sortFunction)
		await countPrograms(ns, programs)
		await checkMostValuableServer(ns, checkedServer, calculatedThreads, programCount)

		checkedServer.sort(sortFunction);

		function sortFunction(a, b) {
			if (a[0] === b[0]) {
				return 0;
			}
			return (a[4] < b[4]) ? 1 : -1;
		}
		async function executeRemoteScripts(ns, target, ram, remoteServer) {
			ns.print(remoteServer)
			await ns.sleep(1000)
			ns.exec("targetHack.js", remoteServer, ram, target)
		}
		async function crackServer(ns, target, ram, programCount) {
			ns.run("cracker.js", 1, target.toString())
			await ns.sleep(100)
			ns.run("shareHack20.js", 1, target.toString())
			ns.run("targetHack.js", ram, target.toString())

		}

		async function checkMostValuableServer(ns, allServerss, calculatedThreads, programList) {
			for (let data of allServerss) {
				ns.print(allServerss)
				if (ns.getHackingLevel() >= allServerss[0][3] && allServerss[0][1] > 0
					&& allServerss[0][2] <= programCount && allServerss[0][5] < tweakTime) {
					await crackServer(ns, allServerss[0][0], calculatedThreads, programList)
					await ns.sleep(500)
					var remoteServers = ns.getPurchasedServers()
					var remoteServersCount = remoteServers.length
					if (remoteServersCount >= 1) {
						for (let s of remoteServers) {
							await executeRemoteScripts(ns, allServerss[0][0],
								ns.getServerMaxRam(s) / scriptRam, s, programList)
							await ns.sleep(1000)
						}
					}
				} else {
					for (let data of allServerss) {
						allServerss.push(allServerss.shift())
						await checkMostValuableServer(ns, allServerss, calculatedThreads, programList)
						await ns.sleep(600)
					}
				}
				await ns.sleep(3600000)
				ns.scriptKill("targetHack.js", "home")
				ns.scriptKill("shareHack20.js", "home")
				if (remoteServersCount >= 1) {
					for (let s of remoteServers) {
						ns.scriptKill("targetHack.js", s)
						await ns.sleep(10)
					}
				} await ns.sleep(10)
			} await ns.sleep(10)
		} await ns.sleep(10)
	}
}