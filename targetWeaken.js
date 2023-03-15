export async function main(ns) {
    var target = ns.args[0]
    let servactsec = ns.getServerSecurityLevel(target)
    let servbasesec = ns.getServerMinSecurityLevel(target)

    async function servWeaken(ns, target) {
        await ns.weaken(target)
        await ns.sleep(10)
    }

    while (true) {


        if (servactsec >= servbasesec) {
            servactsec = ns.getServerSecurityLevel(target)
            servbasesec = ns.getServerMinSecurityLevel(target)
            await servWeaken(ns, target)
            servactsec = ns.getServerSecurityLevel(target)
            servbasesec = ns.getServerMinSecurityLevel(target)

            await ns.sleep(10)
        }

        await ns.sleep(10)
    }
}