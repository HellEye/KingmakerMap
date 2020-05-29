class Building {
	size = [0, 0]
	image = []
	cost = 0
	bonus = {
		economy: 0,
		stability: 0,
		loyalty: 0,
		defense: 0,
		unrest: 0,
		fame: 0

	}
	settlementBonus = {
		lore: 0,
		productivity: 0,
		society: 0,
		law: 0,
		crime: 0
	}
	discounts = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = []
	text = "Generic building, if you're seeing this I fucked up"
}

export default Building