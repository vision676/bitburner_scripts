export async function main(ns) {
    var target = ns.args[0]

    async function servHack(ns, target) {
        await ns.hack(target)
        await ns.sleep(10)
    }
    async function servGrow(ns, target) {
        await ns.grow(target)
        await ns.sleep(10)
    }
    /*async function servWeaken(ns, target) {
         await ns.weaken(target)
         await ns.sleep(10)
     }*/

    while (true) {
        let servmaxmon = ns.getServerMaxMoney(target)
        let servactmon = ns.getServerMoneyAvailable(target)
        /*let servactsec = ns.getServerSecurityLevel(target)
        let servbasesec = ns.getServerMinSecurityLevel(target)

        if (servactsec >= servbasesec * 2) {
             while(servactsec > servbasesec * 1){
             servactsec = ns.getServerSecurityLevel(target)
             servbasesec = ns.getServerMinSecurityLevel(target)
             await servWeaken(ns, target)
             await ns.sleep(10)
         } await ns.sleep(10)}*/
        if (servactmon < servmaxmon * 0.30) {
            while (servactmon < servmaxmon * 0.80) {
                servmaxmon = ns.getServerMaxMoney(target)
                servactmon = ns.getServerMoneyAvailable(target)
                await servGrow(ns, target)
                await ns.sleep(10)
            } await ns.sleep(10)
            await ns.sleep(10)
        }
        if (servactmon >= servmaxmon * 0.30) {
            servmaxmon = ns.getServerMaxMoney(target)
            servactmon = ns.getServerMoneyAvailable(target)
            await servHack(ns, target)
            await ns.sleep(10)

        }
        await ns.sleep(10)
    }
}