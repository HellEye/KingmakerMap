//gets rid of the stupid warning without having to sort all this stuff
/*eslint no-use-before-define: [0, { "classes": false }]*/
/*eslint-env es6*/
import AlchemistImg from "../../../../res/img/BuildingImages/Alchemist.png"
import Building from "./building"
import BankImg from "../../../../res/img/BuildingImages/Bank.png"
import BarracksImg from "../../../../res/img/BuildingImages/Barracks.png"
import BardicCollege_0Img from "../../../../res/img/BuildingImages/BardicCollege_0.png"
import BardicCollege_1Img from "../../../../res/img/BuildingImages/BardicCollege_1.png"
import BardicCollegeImg from "../../../../res/img/BuildingImages/BardicCollege.png"
import BlackMarketImg from "../../../../res/img/BuildingImages/BlackMarket.png"
import BreweryImg from "../../../../res/img/BuildingImages/Brewery.png"
import BridgeImg from "../../../../res/img/BuildingImages/BridgeC.png"
import BrothelImg from "../../../../res/img/BuildingImages/Brothel.png"
import CastersTowerImg from "../../../../res/img/BuildingImages/CastersTower.png"

import BureauImg from "../../../../res/img/BuildingImages/Bureau.png"
import Bureau_0Img from "../../../../res/img/BuildingImages/Bureau_0.png"
import Bureau_1Img from "../../../../res/img/BuildingImages/Bureau_1.png"
import CisternImg from "../../../../res/img/BuildingImages/Cistern.png"

import Castle_0Img from "../../../../res/img/BuildingImages/Castle_0.png"
import Castle_1Img from "../../../../res/img/BuildingImages/Castle_1.png"
import Castle_3Img from "../../../../res/img/BuildingImages/Castle_3.png"
import Castle_2Img from "../../../../res/img/BuildingImages/Castle_2.png"
import CastleImg from "../../../../res/img/BuildingImages/Castle.png"

import Cathedral_0Img from "../../../../res/img/BuildingImages/Cathedral_0.png"
import Cathedral_1Img from "../../../../res/img/BuildingImages/Cathedral_1.png"
import Cathedral_3Img from "../../../../res/img/BuildingImages/Cathedral_3.png"
import Cathedral_2Img from "../../../../res/img/BuildingImages/Cathedral_2.png"
import CathedralImg from "../../../../res/img/BuildingImages/Cathedral.png"
import DumpImg from "../../../../res/img/BuildingImages/Dump.png"
import ExoticArtisanImg from "../../../../res/img/BuildingImages/ExoticArtisan.png"
import GranaryImg from "../../../../res/img/BuildingImages/Granary.png"

import ForeignQuarter_0Img from "../../../../res/img/BuildingImages/ForeignQuarter_0.png"
import ForeignQuarter_1Img from "../../../../res/img/BuildingImages/ForeignQuarter_1.png"
import ForeignQuarter_3Img from "../../../../res/img/BuildingImages/ForeignQuarter_3.png"
import ForeignQuarter_2Img from "../../../../res/img/BuildingImages/ForeignQuarter_2.png"
import ForeignQuarterImg from "../../../../res/img/BuildingImages/ForeignQuarter.png"

import Foundry_0Img from "../../../../res/img/BuildingImages/Foundry_0.png"
import Foundry_1Img from "../../../../res/img/BuildingImages/Foundry_1.png"
import FoundryImg from "../../../../res/img/BuildingImages/Foundry.png"
import GraveyardImg from "../../../../res/img/BuildingImages/Graveyard.png"
import HerbalistImg from "../../../../res/img/BuildingImages/Herbalist.png"
import InnImg from "../../../../res/img/BuildingImages/Inn.png"

import Hospital_0Img from "../../../../res/img/BuildingImages/Hospital_0.png"
import Hospital_1Img from "../../../../res/img/BuildingImages/Hospital_1.png"
import HospitalImg from "../../../../res/img/BuildingImages/Hospital.png"
import JailImg from "../../../../res/img/BuildingImages/Jail.png"
import LibraryImg from "../../../../res/img/BuildingImages/Library.png"
import MansionImg from "../../../../res/img/BuildingImages/Mansion.png"

import MagicalAcademy_0Img from "../../../../res/img/BuildingImages/MagicalAcademy_0.png"
import MagicalAcademy_1Img from "../../../../res/img/BuildingImages/MagicalAcademy_1.png"
import MagicalAcademyImg from "../../../../res/img/BuildingImages/MagicalAcademy.png"
import MillImg from "../../../../res/img/BuildingImages/Mill.png"

import Menagerie_0Img from "../../../../res/img/BuildingImages/Menagerie_0.png"
import Menagerie_1Img from "../../../../res/img/BuildingImages/Menagerie_1.png"
import Menagerie_3Img from "../../../../res/img/BuildingImages/Menagerie_3.png"
import Menagerie_2Img from "../../../../res/img/BuildingImages/Menagerie_2.png"
import MenagerieImg from "../../../../res/img/BuildingImages/Menagerie.png"

import MilitaryAcademy_0Img from "../../../../res/img/BuildingImages/MilitaryAcademy_0.png"
import MilitaryAcademy_1Img from "../../../../res/img/BuildingImages/MilitaryAcademy_1.png"
import MilitaryAcademyImg from "../../../../res/img/BuildingImages/MilitaryAcademy.png"
import MintImg from "../../../../res/img/BuildingImages/Mint.png"
import MonumentImg from "../../../../res/img/BuildingImages/Monument.png"

import Monastery_0Img from "../../../../res/img/BuildingImages/Monastery_0.png"
import Monastery_1Img from "../../../../res/img/BuildingImages/Monastery_1.png"
import MonasteryImg from "../../../../res/img/BuildingImages/Monastery.png"
import ObservatoryImg from "../../../../res/img/BuildingImages/Observatory.png"

import Museum_0Img from "../../../../res/img/BuildingImages/Museum_0.png"
import Museum_1Img from "../../../../res/img/BuildingImages/Museum_1.png"
import MuseumImg from "../../../../res/img/BuildingImages/Museum.png"
import OrphanageImg from "../../../../res/img/BuildingImages/Orphanage.png"
import ParkImg from "../../../../res/img/BuildingImages/Park.png"

import Palace_0Img from "../../../../res/img/BuildingImages/Palace_0.png"
import Palace_1Img from "../../../../res/img/BuildingImages/Palace_1.png"
import Palace_3Img from "../../../../res/img/BuildingImages/Palace_3.png"
import Palace_2Img from "../../../../res/img/BuildingImages/Palace_2.png"
import PalaceImg from "../../../../res/img/BuildingImages/Palace.png"
import PierImg from "../../../../res/img/BuildingImages/Pier.png"
import ShopImg from "../../../../res/img/BuildingImages/Shop.png"
import ShrineImg from "../../../../res/img/BuildingImages/Shrine.png"
import SmithyImg from "../../../../res/img/BuildingImages/Smithy.png"
import StableImg from "../../../../res/img/BuildingImages/Stable.png"
import TanneryImg from "../../../../res/img/BuildingImages/Tannery.png"

import Stockyard_0Img from "../../../../res/img/BuildingImages/Stockyard_0.png"
import Stockyard_1Img from "../../../../res/img/BuildingImages/Stockyard_1.png"
import Stockyard_3Img from "../../../../res/img/BuildingImages/Stockyard_3.png"
import Stockyard_2Img from "../../../../res/img/BuildingImages/Stockyard_2.png"
import StockyardImg from "../../../../res/img/BuildingImages/Stockyard.png"
import TavernImg from "../../../../res/img/BuildingImages/Tavern.png"
import TenementImg from "../../../../res/img/BuildingImages/Tenement.png"
import TradeShopImg from "../../../../res/img/BuildingImages/TradeShop.png"

import Theater_0Img from "../../../../res/img/BuildingImages/Theater_0.png"
import Theater_1Img from "../../../../res/img/BuildingImages/Theater_1.png"
import TheaterImg from "../../../../res/img/BuildingImages/Theater.png"

import TownHall_0Img from "../../../../res/img/BuildingImages/TownHall_0.png"
import TownHall_1Img from "../../../../res/img/BuildingImages/TownHall_1.png"
import TownHallImg from "../../../../res/img/BuildingImages/TownHall.png"
import WatchtowerImg from "../../../../res/img/BuildingImages/Watchtower.png"
import WaterwayImg from "../../../../res/img/BuildingImages/WaterwayUD.png"
import HouseImg from "../../../../res/img/BuildingImages/House.png"

import Academy_0Img from "../../../../res/img/BuildingImages/Academy_0.png"
import Academy_1Img from "../../../../res/img/BuildingImages/Academy_1.png"
import AcademyImg from "../../../../res/img/BuildingImages/Academy.png"

import Arena_0Img from "../../../../res/img/BuildingImages/Arena_0.png"
import Arena_1Img from "../../../../res/img/BuildingImages/Arena_1.png"
import Arena_3Img from "../../../../res/img/BuildingImages/Arena_3.png"
import Arena_2Img from "../../../../res/img/BuildingImages/Arena_2.png"
import ArenaImg from "../../../../res/img/BuildingImages/Arena.png"

import Garrison_0Img from "../../../../res/img/BuildingImages/Garrison_0.png"
import Garrison_1Img from "../../../../res/img/BuildingImages/Garrison_1.png"
import GarrisonImg from "../../../../res/img/BuildingImages/Garrison.png"

import Guildhall_0Img from "../../../../res/img/BuildingImages/Guildhall_0.png"
import Guildhall_1Img from "../../../../res/img/BuildingImages/Guildhall_1.png"
import GuildhallImg from "../../../../res/img/BuildingImages/Guildhall.png"
import LuxuryStoreImg from "../../../../res/img/BuildingImages/LuxuryStore.png"
import MagicShopImg from "../../../../res/img/BuildingImages/MagicShop.png"

import Market_0Img from "../../../../res/img/BuildingImages/Market_0.png"
import Market_1Img from "../../../../res/img/BuildingImages/Market_1.png"
import MarketImg from "../../../../res/img/BuildingImages/Market.png"

import NobleVilla_0Img from "../../../../res/img/BuildingImages/NobleVilla_0.png"
import NobleVilla_1Img from "../../../../res/img/BuildingImages/NobleVilla_1.png"
import NobleVillaImg from "../../../../res/img/BuildingImages/NobleVilla.png"

import Temple_0Img from "../../../../res/img/BuildingImages/Temple_0.png"
import Temple_1Img from "../../../../res/img/BuildingImages/Temple_1.png"
import TempleImg from "../../../../res/img/BuildingImages/Temple.png"

import University_0Img from "../../../../res/img/BuildingImages/University_0.png"
import University_1Img from "../../../../res/img/BuildingImages/University_1.png"
import University_3Img from "../../../../res/img/BuildingImages/University_3.png"
import University_2Img from "../../../../res/img/BuildingImages/University_2.png"
import UniversityImg from "../../../../res/img/BuildingImages/University.png"

import Waterfront_0Img from "../../../../res/img/BuildingImages/WaterfrontS_0.png"
import Waterfront_1Img from "../../../../res/img/BuildingImages/WaterfrontS_1.png"
import Waterfront_3Img from "../../../../res/img/BuildingImages/WaterfrontS_3.png"
import Waterfront_2Img from "../../../../res/img/BuildingImages/WaterfrontS_2.png"
import WaterfrontImg from "../../../../res/img/BuildingImages/WaterfrontS.png"

class Alchemist {
	id = 2

	name = "Alchemist"
	image = [AlchemistImg]

	bpCost = 18
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = "Base Value +1,00gp"
	magicItems = "1 minor potion or wondrous item"
	text =
		"The laboratory and home of a crafter of poisons, potionions, or alchemical items."
}

class Bank {
	id = 4

	name = "Bank"
	image = [BankImg]

	bpCost = 28
	size = 1
	bonus = {
		...Building.bonus,
		economy: 4
	}
	settlementBonus = { ...Building.settlementBonus }
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
	image = [BardicCollege_0Img, BardicCollege_1Img, BardicCollegeImg]
	name = "Bardic College"
	bpCost = 40
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 3,
		stability: 1,
		fame: 1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = [Library, Museum, Theater]
	discountedBy = [University]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "2 minor scroll or wondrous item"
	text =
		"A center for artistic learning. Education in a Bardic College also includes research into a wide-range of historical topics"
}

class Barracks {
	id = 6

	name = "Barracks"
	image = [BarracksImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		unrest: -1,
		defense: 2
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1
	}
	discounts = []
	discountedBy = [MilitaryAcademy, TownHall]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text =
		"A building to house conscripts, guards, militia, soldiers, or similar military forces."
}

class BlackMarket {
	id = 7

	name = "Black Market"
	image = [BlackMarketImg]

	bpCost = 50
	size = 1
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 1,
		unrest: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Brewery {
	id = 8

	name = "Brewery"
	image = [BreweryImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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

	name = "Bridge"
	image = [BridgeImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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

	name = "Brothel"
	image = [BrothelImg]

	bpCost = 4
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
		unrest: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		corruption: 1,
		crime: 1
	}
	discounts = []
	discountedBy = [BlackMarket, Theater, Arena]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = ""
	magicItems = ""
	text =
		"An establishment for dancing, drinking, carousing, and holding celebrations."
}
class Bureau {
	id = 11

	image = [Bureau_0Img, Bureau_1Img, BureauImg]
	name = "Bureau"

	bpCost = 10
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: -1,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		corruption: 1,
		crime: 1
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text =
		"A large warren of offices for clerks and record-keepers working for a guild or government"
}

class CastersTower {
	id = 12

	name = "Casters Tower"
	image = [CastersTowerImg]

	bpCost = 30
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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

	image = [Castle_0Img, Castle_1Img, Castle_3Img, Castle_2Img, CastleImg]
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
		defense: 8
	}
	settlementBonus = { ...Building.settlementBonus }
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
		Cathedral_0Img,
		Cathedral_1Img,
		Cathedral_3Img,
		Cathedral_2Img,
		CathedralImg
	]
	name = "Cathedral"

	bpCost = 58
	size = 4
	bonus = {
		...Building.bonus,
		loyalty: 4,
		stability: 4,
		unrest: -4,
		fame: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 2
	}
	discounts = [Academy, Temple]
	discountedBy = []
	upgradesFrom = null
	limit = "1 per Settelment"
	special = "Halves Consumption increase for Promotion edicts"
	magicItems =
		"3 minor potion or wondrous item, 2 medium potion or wondrous item"
	text = "The focal point of the settlement’s spiritual leadership."
}

class Cistern {
	id = 15

	name = "Cistern"
	image = [CisternImg]

	bpCost = 6
	size = 1
	bonus = { ...Building.bonus }
	settlementBonus = { ...Building.settlementBonus }
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
		defense: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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

	name = "Dump"
	image = [DumpImg]

	bpCost = 4
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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
	bonus = { ...Building.bonus }
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Settlement must have a building that can create medium magic items"
	special =
		"Can share lot with Castle, Cathedral, Market, Monument, Park, or Town Hall"
	magicItems = ""
	text =
		"A fountain built around several decanters of endless water that provides an inexhaustible supply of fresh water"
}

class ExoticArtisan {
	id = 19

	name = "Exotic Artisan"
	image = [ExoticArtisanImg]

	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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
		ForeignQuarter_0Img,
		ForeignQuarter_1Img,
		ForeignQuarter_3Img,
		ForeignQuarter_2Img,
		ForeignQuarterImg
	]
	name = "Foreign Quarter"

	bpCost = 30
	size = 4
	bonus = {
		...Building.bonus,
		economy: 3,
		stability: -1
	}
	settlementBonus = {
		...Building.settlementBonus,
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
	text =
		"An area with many foreigners, as well as shops and services catering to them"
}
class Foundry {
	id = 21

	image = [Foundry_0Img, Foundry_1Img, FoundryImg]
	name = "Foundry"

	bpCost = 16
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1,
		unrest: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1
	}
	discounts = [Smithy]
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special =
		"Increase the Economy and BP earned per turn by 1 for 1 Mine connected to this settlement by a river or Road"
	magicItems = ""
	text =
		"Processes ore and refines it into finished metal. Perfect for Saturday nights"
}

class Granary {
	id = 23

	name = "Granary"
	image = [GranaryImg]

	bpCost = 12
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = [Garrison]
	upgradesFrom = null
	limit = ""
	special =
		"If Farms reduce Consumption below , store up to 5 BP of excess production for use on a later turn when Consumption exceeds the Treasury"
	magicItems = ""
	text = "A place to store grain and food."
}

class Graveyard {
	id = 24

	name = "Graveyard"
	image = [GraveyardImg]

	bpCost = 4
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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

	name = "Herbalist"
	image = [HerbalistImg]

	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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

	image = [Hospital_0Img, Hospital_1Img, HospitalImg]
	name = "Hospital"

	bpCost = 30
	size = 2
	bonus = {
		...Building.bonus,
		loyalty: 1,
		stability: 2
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Inn {
	id = 29

	name = "Inn"
	image = [InnImg]

	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Jail {
	id = 30

	name = "Jail"
	image = [JailImg]

	bpCost = 14
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Library {
	id = 31

	name = "Library"
	image = [LibraryImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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
class MagicalAcademy {
	id = 34

	image = [MagicalAcademy_0Img, MagicalAcademy_1Img, MagicalAcademyImg]
	name = "Magical Academy"

	bpCost = 58
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		fame: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 2,
		society: 1
	}
	discounts = [CastersTower, Library, MagicShop]
	discountedBy = [University]
	upgradesFrom = null
	limit = ""
	special =
		"Increase Lore bonus by 2 for questions relating to Knowledge (arcana)"
	magicItems =
		"3 minor potion, scroll or wondrous item, 1 medium potion, scroll or wondrous item"
	text =
		"An institution for training students in spellcasting, magic item crafting, and various arcane arts."
}

class MagicalStreetlamps {
	id = 35
	image = []
	name = "Magical Streetlamps"
	bpCost = 5
	size = 0
	bonus = { ...Building.bonus }
	settlementBonus = {
		...Building.settlementBonus,
		crime: -1
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit =
		"Settlement must have a Cathedral, Magic Shop, Magical Academy, or Temple"
	special = "Can share lot with any building or improvement"
	magicItems = ""
	text = "Continual flame lamps that illuminate the lot."
}

class Mansion {
	id = 36

	name = "Mansion"
	image = [MansionImg]

	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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
class Menagerie {
	id = 38

	image = [
		Menagerie_0Img,
		Menagerie_1Img,
		Menagerie_3Img,
		Menagerie_2Img,
		MenagerieImg
	]
	name = "Menagerie"

	bpCost = 16
	size = 4
	bonus = {
		...Building.bonus,
		economy: 1,
		fame: 1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special =
		"Increase Loyality by 1/4 the CR of the highest-CR creature in the Menagerie. Pathfinder monsters of the same relative power have higher CR compared to 5e"
	magicItems = ""
	text = "A large park stocked with exotic creatures for public viewing"
}
class MilitaryAcademy {
	id = 39

	image = [MilitaryAcademy_0Img, MilitaryAcademy_1Img, MilitaryAcademyImg]
	name = "Military Academy"

	bpCost = 36
	size = 2
	bonus = {
		...Building.bonus,
		loyalty: 2,
		stability: 1,
		fame: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1,
		lore: 1
	}
	discounts = [Barracks]
	discountedBy = [University]
	upgradesFrom = null
	limit = "1 per Settlement"
	special =
		"Armies and commanders recruited at the settlement gain one bonus tactic"
	magicItems =
		"1 minor armor, shield or weapon, 1 medium armor, shield or weapon"
	text =
		"Armies and commanders recruited at the settlement gain one bonus tactic"
}

class Mill {
	id = 40

	name = "Mill"
	image = [MillImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special =
		"With GM approval, you can construct a windmill (same cost) wthout the water"
	magicItems = ""
	text = "A building used to cut lumber or grind grain"
}

class Mint {
	id = 41

	name = "Mint"
	image = [MintImg]

	bpCost = 30
	size = 1
	bonus = {
		...Building.bonus,
		economy: 3,
		loyalty: 3,
		stability: 1,
		fame: 1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = [Palace]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text =
		"A secure building where the kingdom’s coinage is minted and standard weights and measures are kept"
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
		defense: 1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = "District land border"
	special = "Cannot be damaged by siege engines"
	magicItems = ""
	text =
		"A fortification of one side of a district with an open or water-filled ditch, often backed by a low dike or embankment."
}
class Monastery {
	id = 43

	image = [Monastery_0Img, Monastery_1Img, MonasteryImg]
	name = "Monastery"

	bpCost = 16
	size = 2
	bonus = {
		...Building.bonus,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1,
		lore: 1
	}
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text =
		"A cloister for meditation, study, and the pursuit of various other scholarly paths."
}

class Monument {
	id = 44

	name = "Monument"
	image = [MonumentImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		unrest: -1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = [Temple]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text =
		"A local memorial such as a bell tower, a statue of a settlement founder, a large tomb, or a public display of art."
}
class Museum {
	id = 45

	image = [Museum_0Img, Museum_1Img, MuseumImg]
	name = "Museum"

	bpCost = 30
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
		fame: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 2,
		society: 1
	}
	discounts = []
	discountedBy = [BardicCollege]
	upgradesFrom = null
	limit = ""
	special =
		"Increase Lore bonus by 2 for questions relating to Knowledge (history); apply Lore bonus on Appraise checks regarding art objects. Up to 6 additional Fame at GM discretion"
	magicItems = ""
	text =
		"A place to display art and artifacts both modern and historical. The GM may allow the kingdom leaders to display a valuable item (such as a magic item or bejeweled statue) in the museum, increasing Fame during this display by 1 for every 10,00 gp of the item’s price (maximum +5 Fame), and by an additional 1 if the item is significant to the kingdom’s history."
}

class Observatory {
	id = 47

	name = "Observatory"
	image = [ObservatoryImg]

	bpCost = 12
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Orphanage {
	id = 48

	name = "Orphanage"
	image = [OrphanageImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1,
		unrest: -1
	}
	settlementBonus = { ...Building.settlementBonus }
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

	image = [Palace_0Img, Palace_1Img, Palace_3Img, Palace_2Img, PalaceImg]
	name = "Palace"

	bpCost = 108
	size = 4
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 6,
		stability: 2,
		fame: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 2
	}
	discounts = [Mansion, Mint, NobleVilla]
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special =
		"Base value +1,00gp; you may make two special edicts per turn, but take a –2 penalty on kingdom checks associated with each special edict"
	magicItems = ""
	text =
		"A grand edifice and walled grounds demonstrating one’s wealth, power, and authority to the world."
}

class Park {
	id = 50

	name = "Park"
	image = [ParkImg]

	bpCost = 4
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		unrest: -1
	}
	settlementBonus = { ...Building.settlementBonus }
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
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Pier {
	id = 52

	name = "Pier"
	image = [PierImg]

	bpCost = 16
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		crime: 1
	}
	discounts = []
	discountedBy = [Guildhall, Waterfront]
	upgradesFrom = null
	limit = "Adjacent to district water border"
	special = "Base value +1,00gp"
	magicItems = ""
	text =
		"Warehouses and workshops for docking ships and handling cargo and passengers."
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
		stability: 2
	}
	settlementBonus = {
		...Building.settlementBonus,
		crime: 1,
		productivity: 1
	}
	discounts = [Cistern, Dump]
	discountedBy = []
	upgradesFrom = null
	limit = "1 per district"
	special = ""
	magicItems = ""
	text =
		"An underground sanitation system that keeps the settlement clean, though it may become home to criminals and monsters."
}

class Shop {
	id = 54

	name = "Shop"
	image = [ShopImg]

	bpCost = 8
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Shrine {
	id = 55

	name = "Shrine"
	image = [ShrineImg]

	bpCost = 8
	size = 1
	bonus = {
		...Building.bonus,
		loyalty: 1,
		unrest: -1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = [Temple]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = "1 minot potion, scroll or wondrous item"
	text =
		"A shrine, idol, sacred grove, or similar holy site designed for worship by pious individuals."
}

class Smithy {
	id = 56

	name = "Smithy"
	image = [SmithyImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = [Foundry]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text =
		"The workshop of an armorsmith, blacksmith, weaponsmith, or other craftsman who works with metal."
}

class Stable {
	id = 57

	name = "Stable"
	image = [StableImg]

	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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
		Stockyard_0Img,
		Stockyard_1Img,
		Stockyard_3Img,
		Stockyard_2Img,
		StockyardImg
	]
	name = "Stockyard"

	bpCost = 20
	size = 4
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: -1
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1
	}
	discounts = [Stable, Tannery]
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special =
		"Farms in this hex or Adjacent to hexes reduce Consumption by 3 instead of 2"
	magicItems = ""
	text =
		"Barns and pens that store herd animals and prepare them for nearby slaughterhouses."
}

class Tannery {
	id = 59

	name = "Tannery"
	image = [TanneryImg]

	bpCost = 6
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Tavern {
	id = 60

	name = "Tavern"
	image = [TavernImg]

	bpCost = 12
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class Tenement {
	id = 62

	name = "Tenement"
	image = [TenementImg]

	bpCost = 1
	size = 1
	bonus = {
		...Building.bonus,
		unrest: 2
	}
	settlementBonus = { ...Building.settlementBonus }
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

	image = [Theater_0Img, Theater_1Img, TheaterImg]
	name = "Theater"

	bpCost = 24
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		stability: 2
	}
	settlementBonus = { ...Building.settlementBonus }
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

	image = [TownHall_0Img, TownHall_1Img, TownHallImg]
	name = "Town Hall"

	bpCost = 22
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		law: 1
	}
	discounts = [Barracks, Cistern, Dump, Jail, Watchtower]
	discountedBy = [Castle]
	upgradesFrom = null
	limit = ""
	special = ""
	magicItems = ""
	text =
		"A public venue for town meetings, repository for town records, and offices for minor bureaucrats."
}

class TradeShop {
	id = 65

	name = "Trade Shop"
	image = [TradeShopImg]

	bpCost = 10
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1,
		stability: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 1
	}
	discounts = []
	discountedBy = [Guildhall]
	upgradesFrom = null
	limit = "Adjacent to 1 House"
	special = "Base balue +500gp"
	magicItems = ""
	text =
		"A shop front for a tradesperson, such as a baker, butcher, candle maker, cobbler, rope maker, or wainwright."
}

class Watchtower {
	id = 67

	name = "Watchtower"
	image = [WatchtowerImg]

	bpCost = 12
	size = 1
	bonus = {
		...Building.bonus,
		stability: 1,
		unrest: -1,
		defense: 2
	}
	settlementBonus = { ...Building.settlementBonus }
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
	bonus = { ...Building.bonus }
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special = "Shares City Wall, can be constructed together with it"
	magicItems = ""
	text =
		"A gate in a City Wall that allows water (such as a river, Aqueduct, or Waterway) to enter the settlement. Blocks unwanted access."
}

class Waterway {
	id = 70

	name = "Waterway"
	image = [WaterwayImg]

	bpCost = 3
	size = 1
	bonus = { ...Building.bonus }
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = []
	upgradesFrom = null
	limit = ""
	special =
		"Counts as district water border for Adjacent to buildings, can build two Adjacent to in one turn for the same cost"
	magicItems = ""
	text =
		"A river or canal occupying part of the District Grid. At the GM’s option, a natural Waterway may already exist on the grid"
}
class Academy {
	id = 1

	image = [Academy_0Img, Academy_1Img, AcademyImg]
	name = "Academy"

	bpCost = 52
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 2
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 2,
		productivity: 1,
		society: 2
	}
	discounts = [CastersTower, Library, MagicShop]
	discountedBy = [Cathedral, University]
	upgradesFrom = Library
	limit = ""
	special =
		"Increase Lore bonus by 2 for questions to one Knowledge or Profession skill"
	magicItems =
		"3 minor scroll or wondrous item, 2 medium scroll or wondrous item"
	text = "An institution of higher learning."
}
class Arena {
	id = 3

	image = [
		Arena_0Img,
		Arena_1Img,
		Arena_3Img,
		Arena_2Img,
		ArenaImg
	]
	name = "Arena"

	bpCost = 40
	size = 4
	bonus = {
		...Building.bonus,
		stability: 4,
		fame: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
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
class Garrison {
	id = 22

	image = [Garrison_0Img, Garrison_1Img, GarrisonImg]
	name = "Garrison"

	bpCost = 28
	size = 2
	bonus = {
		...Building.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2
	}
	settlementBonus = { ...Building.settlementBonus }
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

	image = [Guildhall_0Img, Guildhall_1Img, GuildhallImg]
	name = "Guildhall"

	bpCost = 34
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		loyalty: 2
	}
	settlementBonus = {
		...Building.settlementBonus,
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

class House {
	id = 28

	name = "House"
	image = [HouseImg]

	bpCost = 3
	size = 1
	bonus = {
		...Building.bonus,
		unrest: -1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = []
	upgradesFrom = Tenement
	limit = ""
	special =
		"The first House you build during the Improvement phase does not count against the total number of buildings you can build during the phase"
	magicItems = ""
	text = "A number of mid-sized houses for citizens."
}

class LuxuryStore {
	id = 32

	name = "Luxury Store"
	image = [LuxuryStoreImg]

	bpCost = 28
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1
	}
	settlementBonus = { ...Building.settlementBonus }
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

	name = "Magic Shop"
	image = [MagicShopImg]

	bpCost = 68
	size = 1
	bonus = {
		...Building.bonus,
		economy: 1
	}
	settlementBonus = { ...Building.settlementBonus }
	discounts = []
	discountedBy = [Academy, MagicalAcademy]
	upgradesFrom = LuxuryStore
	limit = "Adjacent to 2 House"
	special = "Base Value +2,00gp"
	magicItems =
		"4 minor wondrous item, 2 medium wondrous item, 1 major wondrous item"
	text = "A shop that specializes in magic items and spells"
}
class Market {
	id = 37

	image = [Market_0Img, Market_1Img, MarketImg]
	name = "Market"

	bpCost = 48
	size = 2
	bonus = {
		...Building.bonus,
		economy: 2,
		stability: 2
	}
	settlementBonus = { ...Building.settlementBonus }
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

	image = [NobleVilla_0Img, NobleVilla_1Img, NobleVillaImg]
	name = "Noble Villa"

	bpCost = 24
	size = 2
	bonus = {
		...Building.bonus,
		economy: 1,
		loyalty: 1,
		stability: 1,
		fame: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		society: 1
	}
	discounts = [ExoticArtisan, LuxuryStore, Mansion]
	discountedBy = [Castle, Palace]
	upgradesFrom = Mansion
	limit = ""
	special = ""
	magicItems = ""
	text =
		"A sprawling manor with luxurious grounds that houses a noble’s family and staff."
}
class Temple {
	id = 61

	image = [Temple_0Img, Temple_1Img, TempleImg]
	name = "Temple"

	bpCost = 32
	size = 2
	bonus = {
		...Building.bonus,
		loyalty: 2,
		stability: 2,
		unrest: -2
	}
	settlementBonus = { ...Building.settlementBonus }
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
		University_0Img,
		University_1Img,
		University_3Img,
		University_2Img,
		UniversityImg
	]
	name = "University"

	bpCost = 78
	size = 4
	bonus = {
		...Building.bonus,
		economy: 3,
		loyalty: 3,
		fame: 1
	}
	settlementBonus = {
		...Building.settlementBonus,
		lore: 4,
		society: 3
	}
	discounts = [
		Academy,
		BardicCollege,
		Library,
		MagicalAcademy,
		MilitaryAcademy,
		Museum
	]
	discountedBy = []
	upgradesFrom = Academy
	limit = ""
	special =
		"increase Lore bonus by 4 for questions relating to one Knowledge or Profession skill"
	magicItems =
		"4 minor scroll or wondrous item, 2 medium scroll or wondrous item"
	text =
		"An institution of higher learning, focusing mainly on mundane subjects but dabbling in magical theory."
}
class Waterfront {
	id = 68

	image = [
		Waterfront_0Img,
		Waterfront_1Img,
		Waterfront_3Img,
		Waterfront_2Img,
		WaterfrontImg
	]
	name = "Waterfront"

	bpCost = 90
	size = 4
	bonus = {
		...Building.bonus,
		economy: 4
	}
	settlementBonus = {
		...Building.settlementBonus,
		productivity: 2
	}
	discounts = [BlackMarket, Guildhall, Market, Pier]
	discountedBy = [University]
	upgradesFrom = Pier
	limit = "Adjacent to district water border, 1 per settlement"
	special = "Base value +4,00gp; halves Loyalty penalty for Taxation edicts"
	magicItems =
		"2 minor wondrous item, 1 medium wondrous item, 1 major wondrous item"
	text =
		"A port for waterborne arrival and departure, with facilities for shipping and shipbuilding."
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
	static _init = () => {
		BuildingList.buildings.forEach((building) => {
			if (building.upgradesFrom !== null)
				building.upgradesFrom = BuildingList.getByType(building.upgradesFrom)
		})
	}
	static getById = (id) => {
		for (let i = 0; i < BuildingList.buildings.length; i++) {
			if (BuildingList.buildings[i].id === id) return BuildingList.buildings[i]
		}
		console.warn(`Did not find building with id ${id}`)
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
			if (
				BuildingList.buildings[i].upgradesFrom &&
				BuildingList.buildings[i].upgradesFrom.constructor ===
					building.constructor
			) {
				return BuildingList.buildings[i]
			}
		}
		return null
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
export { BuildingList }
