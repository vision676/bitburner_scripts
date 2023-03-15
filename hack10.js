/** @param {NS} ns **/
export async function main(ns) {

    async function servHack(ns, target) {
        await ns.hack(target)
        await ns.sleep(10)
    }
    async function servGrow(ns, target) {
        await ns.grow(target)
        await ns.sleep(10)
    }

    async function servWeaken(ns, target) {
        await ns.weaken(target)
        await ns.sleep(10)
    }


    while (true) {
        var target = ns.getHostname()
        var servmaxmon = ns.getServerMaxMoney(target)
        var servactmon = ns.getServerMoneyAvailable(target)
        var servactsec = ns.getServerSecurityLevel(target)
        var servbasesec = ns.getServerMinSecurityLevel(target)
        if (servactsec > servbasesec * 3) {
            while (servactsec > servbasesec * 2.5) {
                await servWeaken(ns, target)
                var servactsec = ns.getServerSecurityLevel(target)
        var servbasesec = ns.getServerMinSecurityLevel(target)
                await ns.sleep(10)
            }
        } else if (servactmon < servmaxmon * 0.02) {
            while (servactmon < servmaxmon * 0.05) {
                await servGrow(ns, target)
                var servmaxmon = ns.getServerMaxMoney(target)
        var servactmon = ns.getServerMoneyAvailable(target)
                await ns.sleep(10)
            }
        } else if (servactmon > servmaxmon * 0.02) {
            await servHack(ns, target)
            var servmaxmon = ns.getServerMaxMoney(target)
        var servactmon = ns.getServerMoneyAvailable(target)
            await ns.sleep(10)

        }
        await ns.sleep(1000)
    }

}