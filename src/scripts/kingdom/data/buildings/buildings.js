//gets rid of the stupid warning without having to sort all this stuff
/*eslint no-use-before-define: [0, { "classes": false }]*/
/*eslint-env es6*/
import Building from "./building"

class Alchemist {
	id = 2
	image = [require("../../../../res/img/BuildingImages/Alchemist.png")]
	name = "Alchemist"
	bpCost = 18
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = "Base Value +1,00gp"
	magicItems = "1 minor potion or wondrous item"
	text = "The laboratory and home of a crafter of poisons, potionions, or alchemical items."
}

class Bank {
	id = 4
	image = [require("../../../../res/img/BuildingImages/Bank.png")]
	name = "Bank"
	bpCost = 28
	size = 1
	bonus = {
		...Building.bonus,
		economy: 4,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Base Value +2,00gp"
	magicItems = ""
	text = "A secure building for storing valuables and granting loans."
}

class BardicCollege {
	id = 5
	image = [
		require("../../../../res/img/BuildingImages/BardicCollege_0.png"),
		require("../../../../res/img/BuildingImages/BardicCollege_1.png"),
		require("../../../../res/img/BuildingImages/BardicCollege.png"),
	]
	name = "Bardic College"
	bpCost = 40
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 3,
		stability: 1,
		fame: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = [Library, Museum, Theater]
	discountedBy = [University]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "2 minor scroll or wondrous item"
	text = "A center for artistic learning. Education in a Bardic College also includes research into a wide-range of historical topics"
}

class Barracks {
	id = 6
	image = [require("../../../../res/img/BuildingImages/Barracks.png")]
	name = "Barracks"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		unrest: -1,
		defense: 2,
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1,
	}
	discounts = []
	discountedBy = [MilitaryAcademy, TownHall]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A building to house conscripts, guards, militia, soldiers, or similar military forces."
}

class BlackMarket {
	id = 7
	image = [require("../../../../res/img/BuildingImages/BlackMarket.png")]
	name = "Black Market"
	bpCost = 50
	size = 1
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 1,
		unrest: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		corruption: 2,
		crime: 2,
	}
	discounts = [Brothel]
	discountedBy = [Waterfront, Market]
	upgradesFrom = null
	limit = "Adjacent to 2 House"
	special = "Base Value +2,00gp"
	magicItems = "2 minor, 1 medium, 1 major"
	text = "A number of shops with secret and usually illegal wares."
}

class Brewery {
	id = 8
	image = [require("../../../../res/img/BuildingImages/Brewery.png")]
	name = "Brewery"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A building for beer brewing, winemaking, or some similar use"
}

class Bridge {
	id = 9
	image = [require("../../../../res/img/BuildingImages/BridgeC.png")]
	name = "Bridge"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Shares the space with a river or Waterway lot"
	magicItems = ""
	text = "Allows travel across a river or Waterway, easing transportation"
}

class Brothel {
	id = 10
	image = [require("../../../../res/img/BuildingImages/Brothel.png")]
	name = "Brothel"
	bpCost = 4
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
		unrest: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		corruption: 1,
		crime: 1,
	}
	discounts = []
	discountedBy = [BlackMarket, Theater, Arena]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = ""
	magicItems = ""
	text = "An establishment for dancing, drinking, carousing, and holding celebrations."
}

class Bureau {
	id = 11
	image = [
		require("../../../../res/img/BuildingImages/Bureau.png"),
		require("../../../../res/img/BuildingImages/Bureau_0.png"),
		require("../../../../res/img/BuildingImages/Bureau_1.png"),
	]
	name = "Bureau"
	bpCost = 10
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: -1,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		corruption: 1,
		crime: 1,
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A large warren of offices for clerks and record-keepers working for a guild or government"
}

class CastersTower {
	id = 12
	image = [require("../../../../res/img/BuildingImages/CastersTower.png")]
	name = "Casters Tower"
	bpCost = 30
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Academy, MagicalAcademy]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "3 minor, 2 medium"
	text = "The home and laboratory for a spellcaster."
}

class Castle {
	id = 13
	image = [
		require("../../../../res/img/BuildingImages/Castle_0.png"),
		require("../../../../res/img/BuildingImages/Castle_1.png"),
		require("../../../../res/img/BuildingImages/Castle_3.png"),
		require("../../../../res/img/BuildingImages/Castle_2.png"),
		require("../../../../res/img/BuildingImages/Castle.png"),
	]
	name = "Castle"
	bpCost = 54
	size = 4
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 2,
		stability: 2,
		unrest: -4,
		fame: 1,
		defense: 8,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = [NobleVilla, TownHall]
	discountedBy = []
	upgradesFrom = null
	limit = "1 per Settelment"
	special = ""
	magicItems = ""
	text = "The home of the settlement’s leader or the heart of its defenses."
}

class Cathedral {
	id = 14
	image = [
		require("../../../../res/img/BuildingImages/Cathedral_0.png"),
		require("../../../../res/img/BuildingImages/Cathedral_1.png"),
		require("../../../../res/img/BuildingImages/Cathedral_3.png"),
		require("../../../../res/img/BuildingImages/Cathedral_2.png"),
		require("../../../../res/img/BuildingImages/Cathedral.png"),
	]
	name = "Cathedral"
	bpCost = 58
	size = 4
	bonus = {
		...Building.bonus,
		loyalty: 4,
		stability: 4,
		unrest: -4,
		fame: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 2,
	}
	discounts = [Academy, Temple]
	discountedBy = []
	upgradesFrom = null
	limit = "1 per Settelment"
	special = "Halves Consumption increase for Promotion edicts"
	magicItems = "3 minor potion or wondrous item, 2 medium potion or wondrous item"
	text = "The focal point of the settlement’s spiritual leadership."
}

class Cistern {
	id = 15
	image = [require("../../../../res/img/BuildingImages/Cistern.png")]
	name = "Cistern"
	bpCost = 6
	size = 1
	bonus = {...Building.bonus}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [SewerSystem, TownHall]
	upgradesFrom = null
	limit = "Not Adjacent to Dump, Graveyard, Stable, Stockyard, or Tannery"
	special = "Can share lot"
	magicItems = ""
	text = "Contains a safe supply of fresh water for the settlement"
}

class CityWall {
	id = 16
	image = []
	name = "City Wall"
	bpCost = 2
	size = 0
	bonus = {
		...Building.bonus,
		unrest: -2,
		defense: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Garrison]
	upgradesFrom = null
	limit = ""
	special = "You can place city gates for free in the wall you own"
	magicItems = " "
	text = "A fortification of one side of a district with a sturdy wall"
}

class Dump {
	id = 17
	image = [require("../../../../res/img/BuildingImages/Dump.png")]
	name = "Dump"
	bpCost = 4
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [SewerSystem, TownHall]
	upgradesFrom = null
	limit = "Not Adjacent to House, Mansion, Noble Villa"
	special = ""
	magicItems = ""
	text = "A centralized place to dispose of refuse."
}

class EverflowingSpring {
	id = 18
	image = []
	name = "Everflowing Spring"
	bpCost = 5
	size = 0
	bonus = {...Building.bonus}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Settlement must have a building that can create medium magic items"
	special = "Can share lot with Castle, Cathedral, Market, Monument, Park, or Town Hall"
	magicItems = ""
	text = "A fountain built around several decanters of endless water that provides an inexhaustible supply of fresh water"
}

class ExoticArtisan {
	id = 19
	image = [require("../../../../res/img/BuildingImages/ExoticArtisan.png")]
	name = "Exotic Artisan"
	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [NobleVilla, Theater]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = ""
	magicItems = "1 minor ring, wand or wondrous item"
	text = "The shop and home of a jeweler, tinker, glassblower, or the like"
}

class ForeignQuarter {
	id = 20
	image = [
		require("../../../../res/img/BuildingImages/ForeignQuarter_0.png"),
		require("../../../../res/img/BuildingImages/ForeignQuarter_1.png"),
		require("../../../../res/img/BuildingImages/ForeignQuarter_3.png"),
		require("../../../../res/img/BuildingImages/ForeignQuarter_2.png"),
		require("../../../../res/img/BuildingImages/ForeignQuarter.png"),
	]
	name = "Foreign Quarter"
	bpCost = 30
	size = 4
	bonus = {
		...Building.bonus,
		economy: 3,
		stability: -1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		crime: 1,
		lore: 1,
		society: 2,
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Increase the value of trade routes by 5% (max 100%)"
	magicItems = ""
	text = "An area with many foreigners, as well as shops and services catering to them"
}

class Foundry {
	id = 21
	image = [
		require("../../../../res/img/BuildingImages/Foundry_0.png"),
		require("../../../../res/img/BuildingImages/Foundry_1.png"),
		require("../../../../res/img/BuildingImages/Foundry.png"),
	]
	name = "Foundry"
	bpCost = 16
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1,
		unrest: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1,
	}
	discounts = [Smithy]
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special = "Increase the Economy and BP earned per turn by 1 for 1 Mine connected to this settlement by a river or Road"
	magicItems = ""
	text = "Processes ore and refines it into finished metal. Perfect for Saturday nights"
}

class Granary {
	id = 23
	image = [require("../../../../res/img/BuildingImages/Granary.png")]
	name = "Granary"
	bpCost = 12
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Garrison]
	upgradesFrom = null
	limit = ""
	special = "If Farms reduce Consumption below , store up to 5 BP of excess production for use on a later turn when Consumption exceeds the Treasury"
	magicItems = ""
	text = "A place to store grain and food."
}

class Graveyard {
	id = 24
	image = [require("../../../../res/img/BuildingImages/Graveyard.png")]
	name = "Graveyard"
	bpCost = 4
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Temple]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A plot of land to honor and bury the dead."
}

class Herbalist {
	id = 26
	image = [require("../../../../res/img/BuildingImages/Herbalist.png")]
	name = "Herbalist"
	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = ""
	magicItems = "1 minor potion or wondrous item"
	text = "The workshop and home of a gardener, healer, or poisoner"
}

class Hospital {
	id = 27
	image = [
		require("../../../../res/img/BuildingImages/Hospital_0.png"),
		require("../../../../res/img/BuildingImages/Hospital_1.png"),
		require("../../../../res/img/BuildingImages/Hospital.png"),
	]
	name = "Hospital"
	bpCost = 30
	size = 2
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 2,
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 1,
		productivity: 2,
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Increase Stability by 2 during plague events"
	magicItems = ""
	text = "A building devoted to healing the sick"
}

class Inn {
	id = 29
	image = [require("../../../../res/img/BuildingImages/Inn.png")]
	name = "Inn"
	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		society: 1,
	}
	discounts = []
	discountedBy = [Market, Theater, Arena]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = "Base Value +500gp"
	magicItems = ""
	text = "A place for visitors to rest."
}

class Jail {
	id = 30
	image = [require("../../../../res/img/BuildingImages/Jail.png")]
	name = "Jail"
	bpCost = 14
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2,
	}
	settlementBonus = {
		...Building.settlementBonus,
		crime: -1,
		law: 1,
	}
	discounts = []
	discountedBy = [Garrison, TownHall]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A fortified structure for confining criminals or dangerous monsters."
}

class Library {
	id = 31
	image = [require("../../../../res/img/BuildingImages/Library.png")]
	name = "Library"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 1,
	}
	discounts = []
	discountedBy = [Academy, BardicCollege, MagicalAcademy, University]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A large building containing an archive of books."
}

class MagicalAcademy {
	id = 34
	image = [
		require("../../../../res/img/BuildingImages/MagicalAcademy_0.png"),
		require("../../../../res/img/BuildingImages/MagicalAcademy_1.png"),
		require("../../../../res/img/BuildingImages/MagicalAcademy.png"),
	]
	name = "Magical Academy"
	bpCost = 58
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		fame: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 2,
		society: 1,
	}
	discounts = [CastersTower, Library, MagicShop]
	discountedBy = [University]
	upgradesFrom = null
	limit = ""
	special = "Increase Lore bonus by 2 for questions relating to Knowledge (arcana)"
	magicItems = "3 minor potion, scroll or wondrous item, 1 medium potion, scroll or wondrous item"
	text = "An institution for training students in spellcasting, magic item crafting, and various arcane arts."
}

class MagicalStreetlamps {
	id = 35
	image = []
	name = "Magical Streetlamps"
	bpCost = 5
	size = 0
	bonus = {...Building.bonus}
	settlementBonus = {
		...Building.settlementBonus,
		crime: -1,
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Settlement must have a Cathedral, Magic Shop, Magical Academy, or Temple"
	special = "Can share lot with any building or improvement"
	magicItems = ""
	text = "Continual flame lamps that illuminate the lot."
}

class Mansion {
	id = 36
	image = [require("../../../../res/img/BuildingImages/Mansion.png")]
	name = "Mansion"
	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1,
		society: 1,
	}
	discounts = []
	discountedBy = [NobleVilla, Palace]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A single huge manor housing a rich family and its servants."
}

class Menagerie {
	id = 38
	image = [
		require("../../../../res/img/BuildingImages/Menagerie_0.png"),
		require("../../../../res/img/BuildingImages/Menagerie_1.png"),
		require("../../../../res/img/BuildingImages/Menagerie_3.png"),
		require("../../../../res/img/BuildingImages/Menagerie_2.png"),
		require("../../../../res/img/BuildingImages/Menagerie.png"),
	]
	name = "Menagerie"
	bpCost = 16
	size = 4
	bonus = {
		...Building.bonus,
		economy: 1,
		fame: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Increase Loyality by 1/4 the CR of the highest-CR creature in the Menagerie. Pathfinder monsters of the same relative power have higher CR compared to 5e"
	magicItems = ""
	text = "A large park stocked with exotic creatures for public viewing"
}

class MilitaryAcademy {
	id = 39
	image = [
		require("../../../../res/img/BuildingImages/MilitaryAcademy_0.png"),
		require("../../../../res/img/BuildingImages/MilitaryAcademy_1.png"),
		require("../../../../res/img/BuildingImages/MilitaryAcademy.png"),
	]
	name = "Military Academy"
	bpCost = 36
	size = 2
	bonus = {
		...Building.bonus,
		loyalty: 2,
		stability: 1,
		fame: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1,
		lore: 1,
	}
	discounts = [Barracks]
	discountedBy = [University]
	upgradesFrom = null
	limit = "1 per Settlement"
	special = "Armies and commanders recruited at the settlement gain one bonus tactic"
	magicItems = "1 minor armor, shield or weapon, 1 medium armor, shield or weapon"
	text = "Armies and commanders recruited at the settlement gain one bonus tactic"
}

class Mill {
	id = 40
	image = [require("../../../../res/img/BuildingImages/Mill.png")]
	name = "Mill"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1,
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special = "With GM approval, you can construct a windmill (same cost) wthout the water"
	magicItems = ""
	text = "A building used to cut lumber or grind grain"
}

class Mint {
	id = 41
	image = [require("../../../../res/img/BuildingImages/Mint.png")]
	name = "Mint"
	bpCost = 30
	size = 1
	bonus = {
		...Building.bonus,
		economy: 3,
		loyalty: 3,
		stability: 1,
		fame: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Palace]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A secure building where the kingdom’s coinage is minted and standard weights and measures are kept"
}

class Moat {
	id = 42
	image = []
	name = "Moat"
	bpCost = 2
	size = 0
	bonus = {
		...Building.bonus,
		unrest: -1,
		defense: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "District land border"
	special = "Cannot be damaged by siege engines"
	magicItems = ""
	text = "A fortification of one side of a district with an open or water-filled ditch, often backed by a low dike or embankment."
}

class Monastery {
	id = 43
	image = [
		require("../../../../res/img/BuildingImages/Monastery_0.png"),
		require("../../../../res/img/BuildingImages/Monastery_1.png"),
		require("../../../../res/img/BuildingImages/Monastery.png"),
	]
	name = "Monastery"
	bpCost = 16
	size = 2
	bonus = {
		...Building.bonus,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1,
		lore: 1,
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A cloister for meditation, study, and the pursuit of various other scholarly paths."
}

class Monument {
	id = 44
	image = [require("../../../../res/img/BuildingImages/Monument.png")]
	name = "Monument"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		unrest: -1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Temple]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A local memorial such as a bell tower, a statue of a settlement founder, a large tomb, or a public display of art."
}

class Museum {
	id = 45
	image = [
		require("../../../../res/img/BuildingImages/Museum_0.png"),
		require("../../../../res/img/BuildingImages/Museum_1.png"),
		require("../../../../res/img/BuildingImages/Museum.png"),
	]
	name = "Museum"
	bpCost = 30
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
		fame: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 2,
		society: 1,
	}
	discounts = []
	discountedBy = [BardicCollege]
	upgradesFrom = null
	limit = ""
	special = "Increase Lore bonus by 2 for questions relating to Knowledge (history); apply Lore bonus on Appraise checks regarding art objects. Up to 6 additional Fame at GM discretion"
	magicItems = ""
	text = "A place to display art and artifacts both modern and historical. The GM may allow the kingdom leaders to display a valuable item (such as a magic item or bejeweled statue) in the museum, increasing Fame during this display by 1 for every 10,00 gp of the item’s price (maximum +5 Fame), and by an additional 1 if the item is significant to the kingdom’s history."
}

class Observatory {
	id = 47
	image = [require("../../../../res/img/BuildingImages/Observatory.png")]
	name = "Observatory"
	bpCost = 12
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 2,
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "1 minor scroll or wondrous item"
	text = "A dome or tower with optical devices for viewing the heavens."
}

class Orphanage {
	id = 48
	image = [require("../../../../res/img/BuildingImages/Orphanage.png")]
	name = "Orphanage"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1,
		unrest: -1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A place for housing and taking care of large numbers of orphans."
}

class Palace {
	id = 49
	image = [
		require("../../../../res/img/BuildingImages/Palace_0.png"),
		require("../../../../res/img/BuildingImages/Palace_1.png"),
		require("../../../../res/img/BuildingImages/Palace_3.png"),
		require("../../../../res/img/BuildingImages/Palace_2.png"),
		require("../../../../res/img/BuildingImages/Palace.png"),
	]
	name = "Palace"
	bpCost = 108
	size = 4
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 6,
		stability: 2,
		fame: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 2,
	}
	discounts = [Mansion, Mint, NobleVilla]
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Base value +1,00gp; you may make two special edicts per turn, but take a –2 penalty on kingdom checks associated with each special edict"
	magicItems = ""
	text = "A grand edifice and walled grounds demonstrating one’s wealth, power, and authority to the world."
}

class Park {
	id = 50
	image = [require("../../../../res/img/BuildingImages/Park.png")]
	name = "Park"
	bpCost = 4
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		unrest: -1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Theater]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A plot of land set aside for its serene beauty."
}

class PavedStreets {
	id = 51
	image = []
	name = "Paved Streets"
	bpCost = 24
	size = 0
	bonus = {
		...Building.bonus,
		economy: 2,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 2,
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "1 per district"
	special = ""
	magicItems = ""
	text = "Brick or stone pavement that speeds transportation."
}

class Pier {
	id = 52
	image = [require("../../../../res/img/BuildingImages/Pier.png")]
	name = "Pier"
	bpCost = 16
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		crime: 1,
	}
	discounts = []
	discountedBy = [Guildhall, Waterfront]
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special = "Base value +1,00gp"
	magicItems = ""
	text = "Warehouses and workshops for docking ships and handling cargo and passengers."
}

class SewerSystem {
	id = 53
	image = []
	name = "Sewer System"
	bpCost = 24
	size = 0
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 2,
	}
	settlementBonus = {
		...Building.settlementBonus,
		crime: 1,
		productivity: 1,
	}
	discounts = [Cistern, Dump]
	discountedBy = []
	upgradesFrom = null
	limit = "1 per district"
	special = ""
	magicItems = ""
	text = "An underground sanitation system that keeps the settlement clean, though it may become home to criminals and monsters."
}

class Shop {
	id = 54
	image = [require("../../../../res/img/BuildingImages/Shop.png")]
	name = "Shop"
	bpCost = 8
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1,
	}
	discounts = []
	discountedBy = [Market]
	upgradesFrom = null
	limit = "Adjacent to House or Mansion"
	special = "Base value +500gp"
	magicItems = ""
	text = "A general store"
}

class Shrine {
	id = 55
	image = [require("../../../../res/img/BuildingImages/Shrine.png")]
	name = "Shrine"
	bpCost = 8
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		unrest: -1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Temple]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "1 minot potion, scroll or wondrous item"
	text = "A shrine, idol, sacred grove, or similar holy site designed for worship by pious individuals."
}

class Smithy {
	id = 56
	image = [require("../../../../res/img/BuildingImages/Smithy.png")]
	name = "Smithy"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Foundry]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "The workshop of an armorsmith, blacksmith, weaponsmith, or other craftsman who works with metal."
}

class Stable {
	id = 57
	image = [require("../../../../res/img/BuildingImages/Stable.png")]
	name = "Stable"
	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Arena, Guildhall, Stockyard]
	upgradesFrom = null
	limit = "Adjacent to House, Mansion or Noble Villa"
	special = "Base value +500gp"
	magicItems = ""
	text = "A structure for housing or selling horses and other mounts."
}

class Stockyard {
	id = 58
	image = [
		require("../../../../res/img/BuildingImages/Stockyard_0.png"),
		require("../../../../res/img/BuildingImages/Stockyard_1.png"),
		require("../../../../res/img/BuildingImages/Stockyard_3.png"),
		require("../../../../res/img/BuildingImages/Stockyard_2.png"),
		require("../../../../res/img/BuildingImages/Stockyard.png"),
	]
	name = "Stockyard"
	bpCost = 20
	size = 4
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: -1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1,
	}
	discounts = [Stable, Tannery]
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Farms in this hex or Adjacent to hexes reduce Consumption by 3 instead of 2"
	magicItems = ""
	text = "Barns and pens that store herd animals and prepare them for nearby slaughterhouses."
}

class Tannery {
	id = 59
	image = [require("../../../../res/img/BuildingImages/Tannery.png")]
	name = "Tannery"
	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		society: -1,
	}
	discounts = []
	discountedBy = [Stockyard]
	upgradesFrom = null
	limit = "Not Adjacent to House, Mansion, Noble Villa or Tenement"
	special = ""
	magicItems = ""
	text = "A structure that prepares hides and leather."
}

class Tavern {
	id = 60
	image = [require("../../../../res/img/BuildingImages/Tavern.png")]
	name = "Tavern"
	bpCost = 12
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		corruption: 1,
	}
	discounts = []
	discountedBy = [Theater]
	upgradesFrom = null
	limit = "Adjacent to House or Mansion"
	special = "Base value +500gp"
	magicItems = ""
	text = "An eating or drinking establishment."
}

class Tenement {
	id = 62
	image = [require("../../../../res/img/BuildingImages/Tenement.png")]
	name = "Tenement"
	bpCost = 1
	size = 1
	bonus = {
		...Building.bonus,
		unrest: 2,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Counts as House for buildings that must be Adjacent to"
	magicItems = ""
	text = "A staggering number of low-rent housing units."
}

class Theater {
	id = 63
	image = [
		require("../../../../res/img/BuildingImages/Theater_0.png"),
		require("../../../../res/img/BuildingImages/Theater_1.png"),
		require("../../../../res/img/BuildingImages/Theater.png"),
	]
	name = "Theater"
	bpCost = 24
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		stability: 2,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = [Brothel, ExoticArtisan, Inn, Park, Tavern]
	discountedBy = [Arena, BardicCollege]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A venue for entertainments such as plays, operas, and concerts."
}

class TownHall {
	id = 64
	image = [
		require("../../../../res/img/BuildingImages/TownHall_0.png"),
		require("../../../../res/img/BuildingImages/TownHall_1.png"),
		require("../../../../res/img/BuildingImages/TownHall.png"),
	]
	name = "Town Hall"
	bpCost = 22
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1,
	}
	discounts = [Barracks, Cistern, Dump, Jail, Watchtower]
	discountedBy = [Castle]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A public venue for town meetings, repository for town records, and offices for minor bureaucrats."
}

class TradeShop {
	id = 65
	image = [require("../../../../res/img/BuildingImages/TradeShop.png")]
	name = "Trade Shop"
	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1,
	}
	discounts = []
	discountedBy = [Guildhall]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = "Base balue +500gp"
	magicItems = ""
	text = "A shop front for a tradesperson, such as a baker, butcher, candle maker, cobbler, rope maker, or wainwright."
}

class Watchtower {
	id = 67
	image = [require("../../../../res/img/BuildingImages/Watchtower.png")]
	name = "Watchtower"
	bpCost = 12
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1,
		unrest: -1,
		defense: 2,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [TownHall]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text = "A tall structure that serves as a guard post."
}

class Watergate {
	id = 69
	image = []
	name = "Watergate"
	bpCost = 2
	size = 0
	bonus = {...Building.bonus}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Shares City Wall, can be constructed together with it"
	magicItems = ""
	text = "A gate in a City Wall that allows water (such as a river, Aqueduct, or Waterway) to enter the settlement. Blocks unwanted access."
}

class Waterway {
	id = 70
	image = [require("../../../../res/img/BuildingImages/WaterwayUD.png")]
	name = "Waterway"
	bpCost = 3
	size = 1
	bonus = {...Building.bonus}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Counts as district water border for Adjacent to buildings, can build two Adjacent to in one turn for the same cost"
	magicItems = ""
	text = "A river or canal occupying part of the District Grid. At the GM’s option, a natural Waterway may already exist on the grid"
}

class Academy {
	id = 1
	image = [
		require("../../../../res/img/BuildingImages/Academy_0.png"),
		require("../../../../res/img/BuildingImages/Academy_1.png"),
		require("../../../../res/img/BuildingImages/Academy.png"),
	]
	name = "Academy"
	bpCost = 52
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 2,
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 2,
		productivity: 1,
		society: 2,
	}
	discounts = [CastersTower, Library, MagicShop]
	discountedBy = [Cathedral, University]
	upgradesFrom = Library
	limit = ""
	special = "Increase Lore bonus by 2 for questions to one Knowledge or Profession skill"
	magicItems = "3 minor scroll or wondrous item, 2 medium scroll or wondrous item"
	text = "An institution of higher learning."
}

class Arena {
	id = 3
	image = [
		require("../../../../res/img/BuildingImages/Arena_0.png"),
		require("../../../../res/img/BuildingImages/Arena_1.png"),
		require("../../../../res/img/BuildingImages/Arena_3.png"),
		require("../../../../res/img/BuildingImages/Arena_2.png"),
		require("../../../../res/img/BuildingImages/Arena.png"),
	]
	name = "Arena"
	bpCost = 40
	size = 4
	bonus = {
		...Building.bonus,
		stability: 4,
		fame: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		crime: 1,
	}
	discounts = [Brothel, Garrison, Inn, Stable, Theater]
	discountedBy = []
	upgradesFrom = Theater
	limit = "1 per Settlement"
	special = ""
	magicItems = ""
	text = "A large public structure for competitions and team sports"
}

class Garrison {
	id = 22
	image = [
		require("../../../../res/img/BuildingImages/Garrison_0.png"),
		require("../../../../res/img/BuildingImages/Garrison_1.png"),
		require("../../../../res/img/BuildingImages/Garrison.png"),
	]
	name = "Garrison"
	bpCost = 28
	size = 2
	bonus = {
		...Building.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = [CityWall, Granary, Jail]
	discountedBy = [Arena]
	upgradesFrom = Barracks
	limit = ""
	special = ""
	magicItems = ""
	text = "A large building to house armies, train guards, and recruit militia"
}

class Guildhall {
	id = 25
	image = [
		require("../../../../res/img/BuildingImages/Guildhall_0.png"),
		require("../../../../res/img/BuildingImages/Guildhall_1.png"),
		require("../../../../res/img/BuildingImages/Guildhall.png"),
	]
	name = "Guildhall"
	bpCost = 34
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 2,
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1,
		productivity: 2,
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

class House {
	id = 28
	image = [require("../../../../res/img/BuildingImages/House.png")]
	name = "House"
	bpCost = 3
	size = 1
	bonus = {
		...Building.bonus,
		unrest: -1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = []
	upgradesFrom = Tenement
	limit = ""
	special = "The first House you build during the Improvement phase does not count against the total number of buildings you can build during the phase"
	magicItems = ""
	text = "A number of mid-sized houses for citizens."
}

class LuxuryStore {
	id = 32
	image = [require("../../../../res/img/BuildingImages/LuxuryStore.png")]
	name = "Luxury Store"
	bpCost = 28
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [NobleVilla]
	upgradesFrom = Shop
	limit = "Adjacent to 1 House"
	special = "Base Value +2,00gp"
	magicItems = "2 minor rings, wands or wondrous item"
	text = "A shop that specializes in expensive comforts for the wealthy."
}

class MagicShop {
	id = 33
	image = [require("../../../../res/img/BuildingImages/MagicShop.png")]
	name = "Magic Shop"
	bpCost = 68
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = []
	discountedBy = [Academy, MagicalAcademy]
	upgradesFrom = LuxuryStore
	limit = "Adjacent to 2 House"
	special = "Base Value +2,00gp"
	magicItems = "4 minor wondrous item, 2 medium wondrous item, 1 major wondrous item"
	text = "A shop that specializes in magic items and spells"
}

class Market {
	id = 37
	image = [
		require("../../../../res/img/BuildingImages/Market_0.png"),
		require("../../../../res/img/BuildingImages/Market_1.png"),
		require("../../../../res/img/BuildingImages/Market.png"),
	]
	name = "Market"
	bpCost = 48
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		stability: 2,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = [BlackMarket, Inn, Shop]
	discountedBy = [Waterfront]
	upgradesFrom = Shop
	limit = "Adjacent to 2 House"
	special = "Base Value +2,00gp"
	magicItems = "2 minor wondrous item"
	text = "An open area for traveling merchants and bargain hunters."
}

class NobleVilla {
	id = 46
	image = [
		require("../../../../res/img/BuildingImages/NobleVilla_0.png"),
		require("../../../../res/img/BuildingImages/NobleVilla_1.png"),
		require("../../../../res/img/BuildingImages/NobleVilla.png"),
	]
	name = "Noble Villa"
	bpCost = 24
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
		stability: 1,
		fame: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		society: 1,
	}
	discounts = [ExoticArtisan, LuxuryStore, Mansion]
	discountedBy = [Castle, Palace]
	upgradesFrom = Mansion
	limit = ""
	special = ""
	magicItems = ""
	text = "A sprawling manor with luxurious grounds that houses a noble’s family and staff."
}

class Temple {
	id = 61
	image = [
		require("../../../../res/img/BuildingImages/Temple_0.png"),
		require("../../../../res/img/BuildingImages/Temple_1.png"),
		require("../../../../res/img/BuildingImages/Temple.png"),
	]
	name = "Temple"
	bpCost = 32
	size = 2
	bonus = {
		...Building.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2,
	}
	settlementBonus = {...Building.settlementBonus}
	discounts = [Graveyard, Monument, Shrine]
	discountedBy = [Cathedral]
	upgradesFrom = Shrine
	limit = ""
	special = ""
	magicItems = "2 minor items"
	text = "A large place of worship dedicated to a deity."
}

class University {
	id = 66
	image = [
		require("../../../../res/img/BuildingImages/University_0.png"),
		require("../../../../res/img/BuildingImages/University_1.png"),
		require("../../../../res/img/BuildingImages/University_3.png"),
		require("../../../../res/img/BuildingImages/University_2.png"),
		require("../../../../res/img/BuildingImages/University.png"),
	]
	name = "University"
	bpCost = 78
	size = 4
	bonus = {
		...Building.bonus,
		economy: 3,
		loyalty: 3,
		fame: 1,
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 4,
		society: 3,
	}
	discounts = [Academy, BardicCollege, Library, MagicalAcademy, MilitaryAcademy, Museum]
	discountedBy = []
	upgradesFrom = Academy
	limit = ""
	special = "increase Lore bonus by 4 for questions relating to one Knowledge or Profession skill"
	magicItems = "4 minor scroll or wondrous item, 2 medium scroll or wondrous item"
	text = "An institution of higher learning, focusing mainly on mundane subjects but dabbling in magical theory."
}

class Waterfront {
	id = 68
	image = [
		require("../../../../res/img/BuildingImages/WaterfrontS_0.png"),
		require("../../../../res/img/BuildingImages/WaterfrontS_1.png"),
		require("../../../../res/img/BuildingImages/WaterfrontS_3.png"),
		require("../../../../res/img/BuildingImages/WaterfrontS_2.png"),
		require("../../../../res/img/BuildingImages/WaterfrontS.png"),
	]
	name = "Waterfront"
	bpCost = 90
	size = 4
	bonus = {
		...Building.bonus,
		economy: 4,
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 2,
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
		new Waterway(),
	]
	static _init = () => {
		BuildingList.buildings.forEach(building => {
			if(building.upgradesFrom!==null)
				building.upgradesFrom = BuildingList.getByType(building.upgradesFrom)
		})
	}
	static getById = (id) => {
		for (let i = 0; i < BuildingList.buildings.length; i++) {
			if (BuildingList.buildings[i].id === id)
				return BuildingList.buildings[i]
		}
		return null
	}
	static getByType = (other) => {
		for (let i = 0; i < BuildingList.buildings.length; i++) {
			if (BuildingList.buildings[i] instanceof other)
				return BuildingList.buildings[i]
		}
	}
	static getByName = (name) => {
		for (let i = 0; i < BuildingList.buildings.length; i++) {
			if (BuildingList.buildings[i].name === name) {
				return BuildingList.buildings[i]
			}
		}
		return null
	}
	static getUpgradeFor = (building) => {
		for (let i = 0; i < BuildingList.buildings.length; i++) {
			// console.log(BuildingList.buildings[i].upgradesFrom && BuildingList.buildings[i].upgradesFrom.constructor === building.constructor )
			if(BuildingList.buildings[i].upgradesFrom && BuildingList.buildings[i].upgradesFrom.constructor === building.constructor ){
				return BuildingList.buildings[i]
			}
		}
		return null;
	}
	/*leaving just in case I ever have to actually sort
	all
	the
	functions
	and
	then
	initiate
	classes
	*/
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

BuildingList._init()
export {BuildingList}
