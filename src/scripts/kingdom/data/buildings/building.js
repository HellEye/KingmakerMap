class Building {
	inst = new Building()
	image = []
	name = ""
	bpCost = 0
	size = 0
	bonus = {
		economy: 0,
		stability: 0,
		loyalty: 0,
		defense: 0,
		unrest: 0,
		fame: 0

	}
	settlementBonus = ""
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "Generic building, if you're seeing this I fucked up"
}

export default Building