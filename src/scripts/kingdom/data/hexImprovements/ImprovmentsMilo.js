class Aqueduct {
	id = 1
	single = false
	name = "Aqueduct"
	bonus = {
		economy: 0,
		loyalty: 1,
		stability: 1,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "One end must be hill or mountain hex. Allows settelment to build water-dependet buildings"
}

class Bridge {
	id = 2
	single = false
	name = "Bridge"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 0,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "Allows crossing the River"
}

class Canal {
	id = 3
	single = false
	name = "Canal"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 0,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "Settlements in a hex with a Canal treat the hex as if it had a river."
}

class Farm {
	id = 4
	single = false
	name = "Farm"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 0,
		unrest: 0,
		consumption: -2,
		bonusBP: 0,
	}
	effect = " "
}

class Fishery {
	id = 5
	single = false
	name = "Fishery"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 0,
		unrest: 0,
		consumption: -1,
		bonusBP: 0,
	}
	effect = ""
}

class Fort {
	id = 6
	single = false
	name = "Fort"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 2,
		unrest: -1,
		consumption: 1,
		bonusBP: 0,
	}
	effect = "Defense +4. If this hex becomes a settlement, this improvement counts as one Barracks and one Stables building."
}

class Highway {
	id = 7
	single = false
	name = "Highway"
	bonus = {
		economy: 0.25,
		loyalty: 0,
		stability: 0.125,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "Improves overland travel speed"
}

class Mine {
	id = 8
	single = true
	name = "Mine"
	bonus = {
		economy: 1,
		loyalty: 0,
		stability: 0,
		unrest: 0,
		consumption: 0,
		bonusBP: 1,
	}
	effect = ""
}

class Quarry {
	id = 9
	single = true
	name = "Quarry"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 1,
		unrest: 0,
		consumption: 0,
		bonusBP: 1,
	}
	effect = ""
}

class Road {
	id = 10
	single = false
	name = "Road"
	bonus = {
		economy: 0.25,
		loyalty: 0,
		stability: 0.125,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "Improves overland travel speed"
}

class Sawmill {
	id = 11
	single = true
	name = "Sawmill"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 1,
		unrest: 0,
		consumption: 0,
		bonusBP: 1,
	}
	effect = ""
}

class Watchtower {
	id = 12
	single = false
	name = "Watchtower"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 1,
		unrest: -1,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "Defense +2. If this hex becomes a settlement, this improvement counts as a Watchtower building."
}

class Lair {
	id = 13
	single = false
	name = "Lair"
	bonus = {
		economy: 0,
		loyalty: 0,
		stability: 1,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "Defense +1 with Fort and Watchtowers, may allow access to Cavern"
}

class Landmark {
	id = 14
	single = false
	name = "Landmark"
	bonus = {
		economy: 0,
		loyalty: 1,
		stability: 0,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "Loyalty +1 with Road and Highway"
}

class Resource {
	id = 15
	single = false
	name = "Resource"
	bonus = {
		economy: 1,
		loyalty: 0,
		stability: 0,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = "Economy/Stability and BP +1 with Mine/Quarry/Sawmill, Consumption -1 with Farm/Fishery"
}

class River {
	id = 16
	single = false
	name = "River"
	bonus = {
		economy: 0.25,
		loyalty: 0,
		stability: 0.125,
		unrest: 0,
		consumption: 0,
		bonusBP: 0,
	}
	effect = ""
}

class ImprovementList {
	static list = [
		new Aqueduct(),
		new Bridge(),
		new Canal(),
		new Farm(),
		new Fishery(),
		new Fort(),
		new Highway(),
		new Mine(),
		new Quarry(),
		new Road(),
		new Sawmill(),
		new Watchtower(),
	]
	static extraList=[
		new Lair(),
		new Landmark(),
		new Resource(),
		new River(),
	]
	static getById = (id) => {
		for (let i = 0; i < ImprovementList.list.length; i++) {
			if (ImprovementList.list[i].id === id)
				return ImprovementList.list[i]
		}
		for (let i = 0; i < ImprovementList.extraList.length; i++) {
			if (ImprovementList.extraList[i].id === id)
				return ImprovementList.extraList[i]
		}
		return null
	}
	static getByName = (name) => {
		for (let i = 0; i < ImprovementList.list.length; i++) {
			if (ImprovementList.list[i].name === name)
				return ImprovementList.list[i]
		}
		for (let i = 0; i < ImprovementList.extraList.length; i++) {
			if (ImprovementList.extraList[i].name === name)
				return ImprovementList.extraList[i]
		}
		return null
	}
	static getByType = (type) => {
		for (let i = 0; i < ImprovementList.list.length; i++) {
			if (ImprovementList.list[i] instanceof type)
				return ImprovementList.list[i]
		}
		for (let i = 0; i < ImprovementList.extraList.length; i++) {
			if (ImprovementList.extraList[i] instanceof type)
				return ImprovementList.extraList[i]
		}
		return null
	}
}

export {
	Aqueduct,
	Bridge,
	Canal,
	Farm,
	Fishery,
	Fort,
	Highway,
	Mine,
	Quarry,
	Road,
	Sawmill,
	Watchtower,
	Lair,
	Landmark,
	Resource,
	River,
}
export {ImprovementList}