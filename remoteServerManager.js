/** @param {NS} ns **/
export async function main(ns) {
	var serv = ns.getPurchasedServers()
	var i = serv.length
	var firstRun = true
	var startRam = 2
	const maxRam = 2048
	const maxNumServers = ns.getPurchasedServerLimit()
	var hostname = "remoteServ"

	if(i == maxNumServers && ns.getServerMaxRam("remoteServ") == maxRam){
			for (let p of serv) {
		await ns.scp("targetHack.js", p)
	}
	}

	async function upgradeServers(hostname, wantedRam) {
		var i = serv.length
		if (i < maxNumServers) {
			while (i < maxNumServers) {
				startRam = wantedRam
				i = serv.length
				await buyServers(ns, hostname, wantedRam)
				await ns.sleep(10)
				if (wantedRam >= maxRam) {
					break
				}
			}
		}else{
			ns.run("serverDeletion.js")
			serv = ns.getPurchasedServers()
		}
		}

	async function buyServers(ns, hostname, wantedRam) {
		ns.purchaseServer(hostname, wantedRam)
		serv = ns.getPurchasedServers()
		for (let p of serv) {
			await ns.scp("targetHack.js", p)
		}
		if (ns.scriptRunning("targetHack.js", "home")) {
			ns.scriptKill("targetHack.js", "home")
		} else if (ns.scriptRunning("checkMostValuableServer.js", "home")) {
			ns.scriptKill("checkMostValuableServer.js", "home")
			ns.run("checkMostValuableServer.js", 1)
		}
	}
	if (firstRun == true) {
		while (firstRun == true) {
			let hostname = "remoteServ"
			let remoteServerBudget = ns.getServerMoneyAvailable("home")
			var serv = ns.getPurchasedServers()
			var i = serv.length
			if (remoteServerBudget > ns.getPurchasedServerCost(startRam)) {
				await buyServers(ns, hostname, startRam)
			} else if (i == maxNumServers) break;
			firstRun = false
			await ns.sleep(1000)
		}
	}

	if (firstRun == false) {
		while (firstRun == false) {
			if (ns.serverExists("remoteServ-23")) {
				var currentRam = ns.getServerMaxRam("remoteServ-23") * 2
			} else {
				var currentRam = startRam * 2
			}
			let remoteServerBudget = ns.getServerMoneyAvailable("home")
			if (remoteServerBudget > ns.getPurchasedServerCost(currentRam) * 25) {
				await upgradeServers(hostname, currentRam)
			} else if (currentRam >= maxRam) {
				continue
			}
			await ns.sleep(100)
		}
	}

}