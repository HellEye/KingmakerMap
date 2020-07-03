//gets rid of the stupid warning without having to sort all this stuff
/*eslint no-use-before-define: [0, { "classes": false }]*/
/*eslint-env es6*/

import Building from "./building"


class Alchemist extends Building {

	id = 2
	image = []
	name = "Alchemist"
	bpCost = 18
	size = 1
	bonus = {
		...super.bonus,
		economy: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = "Base Value +1,00gp"
	magicItems = "1 minor potion or wondrous item"
	text = "The laboratory and home of a crafter of poisons, potionions, or alchemical items."
}


class Bank extends Building {

	id = 4
	image = []
	name = "Bank"
	bpCost = 28
	size = 1
	bonus = {
		...super.bonus,
		economy: 4
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Base Value +2,00gp"
	magicItems = ""
	text = "A secure building for storing valuables and granting loans."
}

class BardicCollege extends Building {

	id = 5
	image = []
	name = "Bardic College"
	bpCost = 40
	size = 2
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 3,
		stability: 1,
		fame: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = [Library, Museum, Theater]
	discountedBy = [University]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "2 minor scroll or wondrous item"
	text = "A center for artistic learning. Education in a Bardic College also includes research into a wide-range of historical topics"
}

class Barracks extends Building {

	id = 6
	image = []
	name = "Barracks"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		unrest: -1,
		defense: 2
	}
	settlementBonus = {
		...super.settlementBonus,
		law: 1
	}
	discounts = []
	discountedBy = [MilitaryAcademy, TownHall]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A building to house conscripts, guards, militia, soldiers, or similar military forces."
}

class BlackMarket extends Building {

	id = 7
	image = []
	name = "Black Market"
	bpCost = 50
	size = 1
	bonus = {
		...super.bonus,
		economy: 2,
		loyalty: 1,
		unrest: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		corruption: 2,
		crime: 2
	}
	discounts = [Brothel]
	discountedBy = [Waterfront, Market]
	upgradesFrom = null
	limit = "Adjacent to 2 House"
	special = "Base Value +2,00gp"
	magicItems = "2 minor, 1 medium, 1 major"
	text = "A number of shops with secret and usually illegal wares."
}

class Brewery extends Building {

	id = 8
	image = []
	name = "Brewery"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		loyalty: 1,
		stability: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A building for beer brewing, winemaking, or some similar use"
}

class Bridge extends Building {

	id = 9
	image = []
	name = "Bridge"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		economy: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Shares the space with a river or Waterway lot"
	magicItems = ""
	text = "Allows travel across a river or Waterway, easing transportation"
}

class Brothel extends Building {

	id = 10
	image = []
	name = "Brothel"
	bpCost = 4
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 2,
		unrest: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		corruption: 1,
		crime: 1
	}
	discounts = []
	discountedBy = [BlackMarket, Theater, Arena]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = ""
	magicItems = ""
	text = "An establishment for dancing, drinking, carousing, and holding celebrations."
}

class Bureau extends Building {

	id = 11
	image = []
	name = "Bureau"
	bpCost = 10
	size = 2
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: -1,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		corruption: 1,
		crime: 1
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A large warren of offices for clerks and record-keepers working for a guild or government"
}

class CastersTower extends Building {

	id = 12
	image = []
	name = "Casters Tower"
	bpCost = 30
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Academy, MagicalAcademy]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "3 minor, 2 medium"
	text = "The home and laboratory for a spellcaster."
}

class Castle extends Building {

	id = 13
	image = []
	name = "Castle"
	bpCost = 54
	size = 4
	bonus = {
		...super.bonus,
		economy: 2,
		loyalty: 2,
		stability: 2,
		unrest: -4,
		fame: 1,
		defense: 8
	}
	settlementBonus = {...super.settlementBonus}
	discounts = [NobleVilla, TownHall]
	discountedBy = []
	upgradesFrom = null
	limit = "1 per Settelment"
	special = ""
	magicItems = ""
	text = "The home of the settlement’s leader or the heart of its defenses."
}

class Cathedral extends Building {

	id = 14
	image = []
	name = "Cathedral"
	bpCost = 58
	size = 4
	bonus = {
		...super.bonus,
		loyalty: 4,
		stability: 4,
		unrest: -4,
		fame: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		law: 2
	}
	discounts = [Academy, Temple]
	discountedBy = []
	upgradesFrom = null
	limit = "1 per Settelment"
	special = "Halves Consumption increase for Promotion edicts"
	magicItems = "3 minor potion or wondrous item, 2 medium potion or wondrous item"
	text = "The focal point of the settlement’s spiritual leadership."
}

class Cistern extends Building {

	id = 15
	image = []
	name = "Cistern"
	bpCost = 6
	size = 1
	bonus = {...super.bonus}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [SewerSystem, TownHall]
	upgradesFrom = null
	limit = "Not Adjacent to Dump, Graveyard, Stable, Stockyard, or Tannery"
	special = "Can share lot"
	magicItems = ""
	text = "Contains a safe supply of fresh water for the settlement"
}

class CityWall extends Building {

	id = 16
	image = []
	name = "City Wall"
	bpCost = 2
	size = 0
	bonus = {
		...super.bonus,
		unrest: -2,
		defense: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Garrison]
	upgradesFrom = null
	limit = ""
	special = "You can place city gates for free in the wall you own"
	magicItems = " "
	text = "A fortification of one side of a district with a sturdy wall"
}

class Dump extends Building {

	id = 17
	image = []
	name = "Dump"
	bpCost = 4
	size = 1
	bonus = {
		...super.bonus,
		stability: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [SewerSystem, TownHall]
	upgradesFrom = null
	limit = "Not Adjacent to House, Mansion, Noble Villa"
	special = ""
	magicItems = ""
	text = "A centralized place to dispose of refuse."
}

class EverflowingSpring extends Building {

	id = 18
	image = []
	name = "Everflowing Spring"
	bpCost = 5
	size = 0
	bonus = {...super.bonus}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Settlement must have a building that can create medium magic items"
	special = "Can share lot with Castle, Cathedral, Market, Monument, Park, or Town Hall"
	magicItems = ""
	text = "A fountain built around several decanters of endless water that provides an inexhaustible supply of fresh water"
}

class ExoticArtisan extends Building {

	id = 19
	image = []
	name = "Exotic Artisan"
	bpCost = 10
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [NobleVilla, Theater]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = ""
	magicItems = "1 minor ring, wand or wondrous item"
	text = "The shop and home of a jeweler, tinker, glassblower, or the like"
}

class ForeignQuarter extends Building {

	id = 20
	image = []
	name = "Foreign Quarter"
	bpCost = 30
	size = 4
	bonus = {
		...super.bonus,
		economy: 3,
		stability: -1
	}
	settlementBonus = {
		...super.settlementBonus,
		crime: 1,
		lore: 1,
		society: 2
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Increase the value of trade routes by 5% (max 100%)"
	magicItems = ""
	text = "An area with many foreigners, as well as shops and services catering to them"
}

class Foundry extends Building {

	id = 21
	image = []
	name = "Foundry"
	bpCost = 16
	size = 2
	bonus = {
		...super.bonus,
		economy: 1,
		stability: 1,
		unrest: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		productivity: 1
	}
	discounts = [Smithy]
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special = "Increase the Economy and BP earned per turn by 1 for 1 Mine connected to this settlement by a river or Road"
	magicItems = ""
	text = "Processes ore and refines it into finished metal. Perfect for Saturday nights"
}


class Granary extends Building {

	id = 23
	image = []
	name = "Granary"
	bpCost = 12
	size = 1
	bonus = {
		...super.bonus,
		loyalty: 1,
		stability: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Garrison]
	upgradesFrom = null
	limit = ""
	special = "If Farms reduce Consumption below , store up to 5 BP of excess production for use on a later turn when Consumption exceeds the Treasury"
	magicItems = ""
	text = "A place to store grain and food."
}

class Graveyard extends Building {

	id = 24
	image = []
	name = "Graveyard"
	bpCost = 4
	size = 1
	bonus = {
		...super.bonus,
		loyalty: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Temple]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A plot of land to honor and bury the dead."
}

class Herbalist extends Building {

	id = 26
	image = []
	name = "Herbalist"
	bpCost = 10
	size = 1
	bonus = {
		...super.bonus,
		loyalty: 1,
		stability: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = ""
	magicItems = "1 minor potion or wondrous item"
	text = "The workshop and home of a gardener, healer, or poisoner"
}

class Hospital extends Building {

	id = 27
	image = []
	name = "Hospital"
	bpCost = 30
	size = 2
	bonus = {
		...super.bonus,
		loyalty: 1,
		stability: 2
	}
	settlementBonus = {
		...super.settlementBonus,
		lore: 1,
		productivity: 2
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Increase Stability by 2 during plague events"
	magicItems = ""
	text = "A building devoted to healing the sick"
}

class Inn extends Building {

	id = 29
	image = []
	name = "Inn"
	bpCost = 10
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		society: 1
	}
	discounts = []
	discountedBy = [Market, Theater, Arena]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = "Base Value +500gp"
	magicItems = ""
	text = "A place for visitors to rest."
}

class Jail extends Building {

	id = 30
	image = []
	name = "Jail"
	bpCost = 14
	size = 1
	bonus = {
		...super.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2
	}
	settlementBonus = {
		...super.settlementBonus,
		crime: -1,
		law: 1
	}
	discounts = []
	discountedBy = [Garrison, TownHall]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A fortified structure for confining criminals or dangerous monsters."
}

class Library extends Building {

	id = 31
	image = []
	name = "Library"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		lore: 1
	}
	discounts = []
	discountedBy = [Academy, BardicCollege, MagicalAcademy, University]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A large building containing an archive of books."
}


class MagicalAcademy extends Building {

	id = 34
	image = []
	name = "Magical Academy"
	bpCost = 58
	size = 2
	bonus = {
		...super.bonus,
		economy: 2,
		fame: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		lore: 2,
		society: 1
	}
	discounts = [CastersTower, Library, MagicShop]
	discountedBy = [University]
	upgradesFrom = null
	limit = ""
	special = "Increase Lore bonus by 2 for questions relating to Knowledge (arcana)"
	magicItems = "3 minor potion, scroll or wondrous item, 1 medium potion, scroll or wondrous item"
	text = "An institution for training students in spellcasting, magic item crafting, and various arcane arts."
}

class MagicalStreetlamps extends Building {

	id = 35
	image = []
	name = "Magical Streetlamps"
	bpCost = 5
	size = 0
	bonus = {...super.bonus}
	settlementBonus = {
		...super.settlementBonus,
		crime: -1
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Settlement must have a Cathedral, Magic Shop, Magical Academy, or Temple"
	special = "Can share lot with any building or improvement"
	magicItems = ""
	text = "Continual flame lamps that illuminate the lot."
}

class Mansion extends Building {

	id = 36
	image = []
	name = "Mansion"
	bpCost = 10
	size = 1
	bonus = {
		...super.bonus,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		law: 1,
		society: 1
	}
	discounts = []
	discountedBy = [NobleVilla, Palace]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A single huge manor housing a rich family and its servants."
}


class Menagerie extends Building {

	id = 38
	image = []
	name = "Menagerie"
	bpCost = 16
	size = 4
	bonus = {
		...super.bonus,
		economy: 1,
		fame: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Increase Loyality by 1/4 the CR of the highest-CR creature in the Menagerie. Pathfinder monsters of the same relative power have higher CR compared to 5e"
	magicItems = ""
	text = "A large park stocked with exotic creatures for public viewing"
}

class MilitaryAcademy extends Building {

	id = 39
	image = []
	name = "Military Academy"
	bpCost = 36
	size = 2
	bonus = {
		...super.bonus,
		loyalty: 2,
		stability: 1,
		fame: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		law: 1,
		lore: 1
	}
	discounts = [Barracks]
	discountedBy = [University]
	upgradesFrom = null
	limit = "1 per Settlement"
	special = "Armies and commanders recruited at the settlement gain one bonus tactic"
	magicItems = "1 minor armor, shield or weapon, 1 medium armor, shield or weapon"
	text = "Armies and commanders recruited at the settlement gain one bonus tactic"
}

class Mill extends Building {

	id = 40
	image = []
	name = "Mill"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		productivity: 1
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special = "With GM approval, you can construct a windmill (same cost) wthout the water"
	magicItems = ""
	text = "A building used to cut lumber or grind grain"
}

class Mint extends Building {

	id = 41
	image = []
	name = "Mint"
	bpCost = 30
	size = 1
	bonus = {
		...super.bonus,
		economy: 3,
		loyalty: 3,
		stability: 1,
		fame: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Palace]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A secure building where the kingdom’s coinage is minted and standard weights and measures are kept"
}

class Moat extends Building {

	id = 42
	image = []
	name = "Moat"
	bpCost = 2
	size = 0
	bonus = {
		...super.bonus,
		unrest: -1,
		defense: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "District land border"
	special = "Cannot be damaged by siege engines"
	magicItems = ""
	text = "A fortification of one side of a district with an open or water-filled ditch, often backed by a low dike or embankment."
}

class Monastery extends Building {

	id = 43
	image = []
	name = "Monastery"
	bpCost = 16
	size = 2
	bonus = {
		...super.bonus,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		law: 1,
		lore: 1
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A cloister for meditation, study, and the pursuit of various other scholarly paths."
}

class Monument extends Building {

	id = 44
	image = []
	name = "Monument"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		loyalty: 1,
		unrest: -1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Temple]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A local memorial such as a bell tower, a statue of a settlement founder, a large tomb, or a public display of art."
}

class Museum extends Building {

	id = 45
	image = []
	name = "Museum"
	bpCost = 30
	size = 2
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 1,
		fame: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		lore: 2,
		society: 1
	}
	discounts = []
	discountedBy = [BardicCollege]
	upgradesFrom = null
	limit = ""
	special = "Increase Lore bonus by 2 for questions relating to Knowledge (history); apply Lore bonus on Appraise checks regarding art objects. Up to 6 additional Fame at GM discretion"
	magicItems = ""
	text = "A place to display art and artifacts both modern and historical. The GM may allow the kingdom leaders to display a valuable item (such as a magic item or bejeweled statue) in the museum, increasing Fame during this display by 1 for every 10,00 gp of the item’s price (maximum +5 Fame), and by an additional 1 if the item is significant to the kingdom’s history."
}


class Observatory extends Building {

	id = 47
	image = []
	name = "Observatory"
	bpCost = 12
	size = 1
	bonus = {
		...super.bonus,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		lore: 2
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "1 minor scroll or wondrous item"
	text = "A dome or tower with optical devices for viewing the heavens."
}

class Orphanage extends Building {

	id = 48
	image = []
	name = "Orphanage"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		stability: 1,
		unrest: -1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A place for housing and taking care of large numbers of orphans."
}

class Palace extends Building {

	id = 49
	image = []
	name = "Palace"
	bpCost = 108
	size = 4
	bonus = {
		...super.bonus,
		economy: 2,
		loyalty: 6,
		stability: 2,
		fame: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		law: 2
	}
	discounts = [Mansion, Mint, NobleVilla]
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Base value +1,00gp; you may make two special edicts per turn, but take a –2 penalty on kingdom checks associated with each special edict"
	magicItems = ""
	text = "A grand edifice and walled grounds demonstrating one’s wealth, power, and authority to the world."
}

class Park extends Building {

	id = 50
	image = []
	name = "Park"
	bpCost = 4
	size = 1
	bonus = {
		...super.bonus,
		loyalty: 1,
		unrest: -1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Theater]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A plot of land set aside for its serene beauty."
}

class PavedStreets extends Building {

	id = 51
	image = []
	name = "Paved Streets"
	bpCost = 24
	size = 0
	bonus = {
		...super.bonus,
		economy: 2,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		productivity: 2
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "1 per district"
	special = ""
	magicItems = ""
	text = "Brick or stone pavement that speeds transportation."
}

class Pier extends Building {

	id = 52
	image = []
	name = "Pier"
	bpCost = 16
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		crime: 1
	}
	discounts = []
	discountedBy = [Guildhall, Waterfront]
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special = "Base value +1,00gp"
	magicItems = ""
	text = "Warehouses and workshops for docking ships and handling cargo and passengers."
}

class SewerSystem extends Building {

	id = 53
	image = []
	name = "Sewer System"
	bpCost = 24
	size = 0
	bonus = {
		...super.bonus,
		loyalty: 1,
		stability: 2
	}
	settlementBonus = {
		...super.settlementBonus,
		crime: 1,
		productivity: 1
	}
	discounts = [Cistern, Dump]
	discountedBy = []
	upgradesFrom = null
	limit = "1 per district"
	special = ""
	magicItems = ""
	text = "An underground sanitation system that keeps the settlement clean, though it may become home to criminals and monsters."
}

class Shop extends Building {

	id = 54
	image = []
	name = "Shop"
	bpCost = 8
	size = 1
	bonus = {
		...super.bonus,
		economy: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		productivity: 1
	}
	discounts = []
	discountedBy = [Market]
	upgradesFrom = null
	limit = "Adjacent to House or Mansion"
	special = "Base value +500gp"
	magicItems = ""
	text = "A general store"
}

class Shrine extends Building {

	id = 55
	image = []
	name = "Shrine"
	bpCost = 8
	size = 1
	bonus = {
		...super.bonus,
		loyalty: 1,
		unrest: -1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Temple]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "1 minot potion, scroll or wondrous item"
	text = "A shrine, idol, sacred grove, or similar holy site designed for worship by pious individuals."
}

class Smithy extends Building {

	id = 56
	image = []
	name = "Smithy"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Foundry]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "The workshop of an armorsmith, blacksmith, weaponsmith, or other craftsman who works with metal."
}

class Stable extends Building {

	id = 57
	image = []
	name = "Stable"
	bpCost = 10
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Arena, Guildhall, Stockyard]
	upgradesFrom = null
	limit = "Adjacent to House, Mansion or Noble Villa"
	special = "Base value +500gp"
	magicItems = ""
	text = "A structure for housing or selling horses and other mounts."
}

class Stockyard extends Building {

	id = 58
	image = []
	name = "Stockyard"
	bpCost = 20
	size = 4
	bonus = {
		...super.bonus,
		economy: 1,
		stability: -1
	}
	settlementBonus = {
		...super.settlementBonus,
		productivity: 1
	}
	discounts = [Stable, Tannery]
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Farms in this hex or Adjacent to hexes reduce Consumption by 3 instead of 2"
	magicItems = ""
	text = "Barns and pens that store herd animals and prepare them for nearby slaughterhouses."
}

class Tannery extends Building {

	id = 59
	image = []
	name = "Tannery"
	bpCost = 6
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		society: -1
	}
	discounts = []
	discountedBy = [Stockyard]
	upgradesFrom = null
	limit = "Not Adjacent to House, Mansion, Noble Villa or Tenement"
	special = ""
	magicItems = ""
	text = "A structure that prepares hides and leather."
}

class Tavern extends Building {

	id = 60
	image = []
	name = "Tavern"
	bpCost = 12
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		corruption: 1
	}
	discounts = []
	discountedBy = [Theater]
	upgradesFrom = null
	limit = "Adjacent to House or Mansion"
	special = "Base value +500gp"
	magicItems = ""
	text = "An eating or drinking establishment."
}


class Tenement extends Building {

	id = 62
	image = []
	name = "Tenement"
	bpCost = 1
	size = 1
	bonus = {
		...super.bonus,
		unrest: 2
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Counts as House for buildings that must be Adjacent to"
	magicItems = ""
	text = "A staggering number of low-rent housing units."
}

class Theater extends Building {

	id = 63
	image = []
	name = "Theater"
	bpCost = 24
	size = 2
	bonus = {
		...super.bonus,
		economy: 2,
		stability: 2
	}
	settlementBonus = {...super.settlementBonus}
	discounts = [Brothel, ExoticArtisan, Inn, Park, Tavern]
	discountedBy = [Arena, BardicCollege]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A venue for entertainments such as plays, operas, and concerts."
}

class TownHall extends Building {

	id = 64
	image = []
	name = "Town Hall"
	bpCost = 22
	size = 2
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 1,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		law: 1
	}
	discounts = [Barracks, Cistern, Dump, Jail, Watchtower]
	discountedBy = [Castle]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A public venue for town meetings, repository for town records, and offices for minor bureaucrats."
}

class TradeShop extends Building {

	id = 65
	image = []
	name = "Trade Shop"
	bpCost = 10
	size = 1
	bonus = {
		...super.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		productivity: 1
	}
	discounts = []
	discountedBy = [Guildhall]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = "Base balue +500gp"
	magicItems = ""
	text = "A shop front for a tradesperson, such as a baker, butcher, candle maker, cobbler, rope maker, or wainwright."
}


class Watchtower extends Building {

	id = 67
	image = []
	name = "Watchtower"
	bpCost = 12
	size = 1
	bonus = {
		...super.bonus,
		stability: 1,
		unrest: -1,
		defense: 2
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [TownHall]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A tall structure that serves as a guard post."
}

class Watergate extends Building {

	id = 69
	image = []
	name = "Watergate"
	bpCost = 2
	size = 0
	bonus = {...super.bonus}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Shares City Wall, can be constructed together with it"
	magicItems = ""
	text = "A gate in a City Wall that allows water (such as a river, Aqueduct, or Waterway) to enter the settlement. Blocks unwanted access."
}

class Waterway extends Building {

	id = 70
	image = []
	name = "Waterway"
	bpCost = 3
	size = 1
	bonus = {...super.bonus}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Counts as district water border for Adjacent to buildings, can build two Adjacent to in one turn for the same cost"
	magicItems = ""
	text = "A river or canal occupying part of the District Grid. At the GM’s option, a natural Waterway may already exist on the grid"
}

class Academy extends Building {

	id = 1
	image = []
	name = "Academy"
	bpCost = 52
	size = 2
	bonus = {
		...super.bonus,
		economy: 2,
		loyalty: 2
	}
	settlementBonus = {
		...super.settlementBonus,
		lore: 2,
		productivity: 1,
		society: 2
	}
	discounts = [CastersTower, Library, MagicShop]
	discountedBy = [Cathedral, University]
	upgradesFrom = Library
	limit = ""
	special = "Increase Lore bonus by 2 for questions to one Knowledge or Profession skill"
	magicItems = "3 minor scroll or wondrous item, 2 medium scroll or wondrous item"
	text = "An institution of higher learning."
}

class Arena extends Building {

	id = 3
	image = []
	name = "Arena"
	bpCost = 40
	size = 4
	bonus = {
		...super.bonus,
		stability: 4,
		fame: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		crime: 1
	}
	discounts = [Brothel, Garrison, Inn, Stable, Theater]
	discountedBy = []
	upgradesFrom = Theater
	limit = "1 per Settlement"
	special = ""
	magicItems = ""
	text = "A large public structure for competitions and team sports"
}

class Garrison extends Building {

	id = 22
	image = []
	name = "Garrison"
	bpCost = 28
	size = 2
	bonus = {
		...super.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2
	}
	settlementBonus = {...super.settlementBonus}
	discounts = [CityWall, Granary, Jail]
	discountedBy = [Arena]
	upgradesFrom = Barracks
	limit = ""
	special = ""
	magicItems = ""
	text = "A large building to house armies, train guards, and recruit militia"
}

class Guildhall extends Building {

	id = 25
	image = []
	name = "Guildhall"
	bpCost = 34
	size = 2
	bonus = {
		...super.bonus,
		economy: 2,
		loyalty: 2
	}
	settlementBonus = {
		...super.settlementBonus,
		law: 1,
		productivity: 2
	}
	discounts = [Pier, Stable, TradeShop]
	discountedBy = [Waterfront]
	upgradesFrom = TradeShop
	Shop
	limit = ""
	special = "Base Value +1,00gp"
	magicItems = ""
	text = "The headquarters for a guild or similar organization."
}

class House extends Building {

	id = 28
	image = []
	name = "House"
	bpCost = 3
	size = 1
	bonus = {
		...super.bonus,
		unrest: -1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = Tenement
	limit = ""
	special = "The first House you build during the Improvement phase does not count against the total number of buildings you can build during the phase"
	magicItems = ""
	text = "A number of mid-sized houses for citizens."
}

class LuxuryStore extends Building {

	id = 32
	image = []
	name = "Luxury Store"
	bpCost = 28
	size = 1
	bonus = {
		...super.bonus,
		economy: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [NobleVilla]
	upgradesFrom = Shop
	limit = "Adjacent to 1 House"
	special = "Base Value +2,00gp"
	magicItems = "2 minor rings, wands or wondrous item"
	text = "A shop that specializes in expensive comforts for the wealthy."
}

class MagicShop extends Building {

	id = 33
	image = []
	name = "Magic Shop"
	bpCost = 68
	size = 1
	bonus = {
		...super.bonus,
		economy: 1
	}
	settlementBonus = {...super.settlementBonus}
	discounts = []
	discountedBy = [Academy, MagicalAcademy]
	upgradesFrom = LuxuryStore
	limit = "Adjacent to 2 House"
	special = "Base Value +2,00gp"
	magicItems = "4 minor wondrous item, 2 medium wondrous item, 1 major wondrous item"
	text = "A shop that specializes in magic items and spells"
}

class Market extends Building {

	id = 37
	image = []
	name = "Market"
	bpCost = 48
	size = 2
	bonus = {
		...super.bonus,
		economy: 2,
		stability: 2
	}
	settlementBonus = {...super.settlementBonus}
	discounts = [BlackMarket, Inn, Shop]
	discountedBy = [Waterfront]
	upgradesFrom = Shop
	limit = "Adjacent to 2 House"
	special = "Base Value +2,00gp"
	magicItems = "2 minor wondrous item"
	text = "An open area for traveling merchants and bargain hunters."
}

class NobleVilla extends Building {

	id = 46
	image = []
	name = "Noble Villa"
	bpCost = 24
	size = 2
	bonus = {
		...super.bonus,
		economy: 1,
		loyalty: 1,
		stability: 1,
		fame: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		society: 1
	}
	discounts = [ExoticArtisan, LuxuryStore, Mansion]
	discountedBy = [Castle, Palace]
	upgradesFrom = Mansion
	limit = ""
	special = ""
	magicItems = ""
	text = "A sprawling manor with luxurious grounds that houses a noble’s family and staff."
}

class Temple extends Building {

	id = 61
	image = []
	name = "Temple"
	bpCost = 32
	size = 2
	bonus = {
		...super.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2
	}
	settlementBonus = {...super.settlementBonus}
	discounts = [Graveyard, Monument, Shrine]
	discountedBy = [Cathedral]
	upgradesFrom = Shrine
	limit = ""
	special = ""
	magicItems = "2 minor items"
	text = "A large place of worship dedicated to a deity."
}

class University extends Building {

	id = 66
	image = []
	name = "University"
	bpCost = 78
	size = 4
	bonus = {
		...super.bonus,
		economy: 3,
		loyalty: 3,
		fame: 1
	}
	settlementBonus = {
		...super.settlementBonus,
		lore: 4,
		society: 3
	}
	discounts = [Academy, BardicCollege, Library, MagicalAcademy, MilitaryAcademy, Museum]
	discountedBy = []
	upgradesFrom = Academy
	limit = ""
	special = "increase Lore bonus by 4 for questions relating to one Knowledge or Profession skill"
	magicItems = "4 minor scroll or wondrous item, 2 medium scroll or wondrous item"
	text = "An institution of higher learning, focusing mainly on mundane subjects but dabbling in magical theory."
}

class Waterfront extends Building {

	id = 68
	image = []
	name = "Waterfront"
	bpCost = 90
	size = 4
	bonus = {
		...super.bonus,
		economy: 4
	}
	settlementBonus = {
		...super.settlementBonus,
		productivity: 2
	}
	discounts = [BlackMarket, Guildhall, Market, Pier]
	discountedBy = [University]
	upgradesFrom = Pier
	limit = "Adjacent to district water border, 1 per settlement"
	special = "Base value +4,00gp; halves Loyalty penalty for Taxation edicts"
	magicItems = "2 minor wondrous item, 1 medium wondrous item, 1 major wondrous item"
	text = "A port for waterborne arrival and departure, with facilities for shipping and shipbuilding."
}

class BuildingList {
	static buildings = [
		new Academy(),
		new Alchemist(),
		new Arena(),
		new Bank(),
		new BardicCollege(),
		new Barracks(),
		new BlackMarket(),
		new Brewery(),
		new Bridge(),
		new Brothel(),
		new Bureau(),
		new CastersTower(),
		new Castle(),
		new Cathedral(),
		new Cistern(),
		new CityWall(),
		new Dump(),
		new EverflowingSpring(),
		new ExoticArtisan(),
		new ForeignQuarter(),
		new Foundry(),
		new Garrison(),
		new Granary(),
		new Graveyard(),
		new Guildhall(),
		new Herbalist(),
		new Hospital(),
		new House(),
		new Inn(),
		new Jail(),
		new Library(),
		new LuxuryStore(),
		new MagicShop(),
		new MagicalAcademy(),
		new MagicalStreetlamps(),
		new Mansion(),
		new Market(),
		new Menagerie(),
		new MilitaryAcademy(),
		new Mill(),
		new Mint(),
		new Moat(),
		new Monastery(),
		new Monument(),
		new Museum(),
		new NobleVilla(),
		new Observatory(),
		new Orphanage(),
		new Palace(),
		new Park(),
		new PavedStreets(),
		new Pier(),
		new SewerSystem(),
		new Shop(),
		new Shrine(),
		new Smithy(),
		new Stable(),
		new Stockyard(),
		new Tannery(),
		new Tavern(),
		new Temple(),
		new Tenement(),
		new Theater(),
		new TownHall(),
		new TradeShop(),
		new University(),
		new Watchtower(),
		new Waterfront(),
		new Watergate(),
		new Waterway()
	]
	static getById = (id) => {
		for (let key in BuildingList.buildings) {
			if (BuildingList.buildings[key].id === id)
				return BuildingList.buildings[key]
		}
		return null
	}
	static getByName = (name) => {
		for (let key in BuildingList.buildings) {
			if (BuildingList.buildings[key].name === name) {
				return BuildingList.buildings[key]
			}
		}
		return null
	}
	//leaving just in case I ever have to actually sort
	// all the functions and then initiate classes
	/*static init = () => {
		this.buildings = {
			Academy: new Academy(),
			Alchemist: new Alchemist(),
			Arena: new Arena(),
			Bank: new Bank(),
			BardicCollege: new BardicCollege(),
			Barracks: new Barracks(),
			BlackMarket: new BlackMarket(),
			Brewery: new Brewery(),
			Bridge: new Bridge(),
			Brothel: new Brothel(),
			Bureau: new Bureau(),
			CastersTower: new CastersTower(),
			Castle: new Castle(),
			Cathedral: new Cathedral(),
			Cistern: new Cistern(),
			CityWall: new CityWall(),
			Dump: new Dump(),
			EverflowingSpring: new EverflowingSpring(),
			ExoticArtisan: new ExoticArtisan(),
			ForeignQuarter: new ForeignQuarter(),
			Foundry: new Foundry(),
			Garrison: new Garrison(),
			Granary: new Granary(),
			Graveyard: new Graveyard(),
			Guildhall: new Guildhall(),
			Herbalist: new Herbalist(),
			Hospital: new Hospital(),
			House: new House(),
			Inn: new Inn(),
			Jail: new Jail(),
			Library: new Library(),
			LuxuryStore: new LuxuryStore(),
			MagicShop: new MagicShop(),
			MagicalAcademy: new MagicalAcademy(),
			MagicalStreetlamps: new MagicalStreetlamps(),
			Mansion: new Mansion(),
			Market: new Market(),
			Menagerie: new Menagerie(),
			MilitaryAcademy: new MilitaryAcademy(),
			Mill: new Mill(),
			Mint: new Mint(),
			Moat: new Moat(),
			Monastery: new Monastery(),
			Monument: new Monument(),
			Museum: new Museum(),
			NobleVilla: new NobleVilla(),
			Observatory: new Observatory(),
			Orphanage: new Orphanage(),
			Palace: new Palace(),
			Park: new Park(),
			PavedStreets: new PavedStreets(),
			Pier: new Pier(),
			SewerSystem: new SewerSystem(),
			Shop: new Shop(),
			Shrine: new Shrine(),
			Smithy: new Smithy(),
			Stable: new Stable(),
			Stockyard: new Stockyard(),
			Tannery: new Tannery(),
			Tavern: new Tavern(),
			Temple: new Temple(),
			Tenement: new Tenement(),
			Theater: new Theater(),
			TownHall: new TownHall(),
			TradeShop: new TradeShop(),
			University: new University(),
			Watchtower: new Watchtower(),
			Waterfront: new Waterfront(),
			Watergate: new Watergate(),
			Waterway: new Waterway()
		}
	}*/
}

export {BuildingList}
