/** @param {NS} ns **/
export async function main(ns) {
	  const programs = {
        "BruteSSH.exe": ns.brutessh,
        "FTPCrack.exe": ns.ftpcrack,
        "relaySMTP.exe": ns.relaysmtp,
        "HTTPWorm.exe": ns.httpworm,
        "SQLInject.exe": ns.sqlinject,
		"NUKE.exe": ns.nuke
    }
	let target = ns.args[0].toString()
	await cracker(ns, target)
	async function cracker(ns, target) {
		for (let program of  Object.keys(programs)) {
			if (ns.fileExists(program, "home")){
				var runProgram = programs[program];
                runProgram(target);
				//ns.installBackdoor(target)
			} else if(ns.getServerNumPortsRequired(target) == 0){
				await ns.nuke(target)
				break
			}
		}
	}
}