/** @param {NS} ns **/
export async function main(ns) {
	let node = 0
	while (node < 16) {
		let hacknetBudget = ns.getServerMoneyAvailable("home") / 2
		let nodeCost = ns.hacknet.getPurchaseNodeCost()
		let levelCost = ns.hacknet.getLevelUpgradeCost(node, 1)
		let ramCost = ns.hacknet.getRamUpgradeCost(node, 1)
		let coreCost = ns.hacknet.getCoreUpgradeCost(node, 1)
		async function buyHacknetNode(ns, actualNode) {
			for (let i = 0; i !== 1; i++) {
				node - 1
				ns.hacknet.purchaseNode(actualNode)
				node++
				node = actualNode
			}
		}
		async function upgradeHacknetNodeLevel(ns, actualNode) {
			ns.hacknet.upgradeLevel(actualNode, 1)
			await ns.sleep(10)
		}
		async function upgradeHacknetNodeRam(ns, actualNode) {
			ns.hacknet.upgradeRam(actualNode, 1)
			await ns.sleep(10)
		}
		async function upgradeHacketNodeCore(ns, actualNode) {
			ns.hacknet.upgradeCore(actualNode, 1)
			await ns.sleep(10)
		}

		if (nodeCost <= hacknetBudget && levelCost == Infinity && ramCost == Infinity && coreCost == Infinity) {
			await buyHacknetNode(ns, node + 1)
		} else if (levelCost <= hacknetBudget && levelCost !== Infinity) {
			await upgradeHacknetNodeLevel(ns, node)
		} else if (ramCost <= hacknetBudget && ramCost !== Infinity) {
			await upgradeHacknetNodeRam(ns, node)
		} else if (coreCost <= hacknetBudget && coreCost !== Infinity) {
			await upgradeHacketNodeCore(ns, node)
		} else {
			await upgradeHacknetNodeLevel(ns, node)
		}
		await ns.sleep(10)
	}
}