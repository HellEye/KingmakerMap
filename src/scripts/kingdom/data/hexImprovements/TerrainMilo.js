import {
	Aqueduct,
	Bridge,
	Canal,
	Farm,
	Fishery,
	Fort,
	Highway, Lair, Landmark,
	Mine,
	Quarry, Resource, River,
	Road,
	Sawmill,
	Watchtower,
} from "./ImprovmentsMilo"

class Cavern {
	id = 1
	name = "Cavern"
	ExpTime = 3
	PrepTime = 3
	PrepCost = 8
	canBuild = [
		{improvement: Road, cost: 4},
		{improvement: Aqueduct, cost: 4},
		{improvement: Highway, cost: 4},
		{improvement: Bridge, cost: 4},
		{improvement: Fishery, cost: 4},
		{improvement: Watchtower, cost: 12},
		{improvement: Fort, cost: 24},
		{improvement: Mine, cost: 6},
		{improvement: Quarry, cost: 6},
	]
}

class Desert {
	id = 2
	name = "Desert"
	ExpTime = 2
	PrepTime = 1
	PrepCost = 4
	canBuild = [
		{improvement: Road, cost: 4},
		{improvement: Aqueduct, cost: 4},
		{improvement: Highway, cost: 4},
		{improvement: Bridge, cost: 4},
		{improvement: Fishery, cost: 4},
		{improvement: Watchtower, cost: 12},
		{improvement: Fort, cost: 24},
		{improvement: Canal, cost: 8},
		{improvement: Farm, cost: 8},
		{improvement: Mine, cost: 6},
	]
}

class Forest {
	id = 3
	name = "Forest"
	ExpTime = 2
	PrepTime = 2
	PrepCost = 4
	canBuild = [
		{improvement: Road, cost: 2},
		{improvement: Aqueduct, cost: 2},
		{improvement: Highway, cost: 2},
		{improvement: Bridge, cost: 2},
		{improvement: Fishery, cost: 4},
		{improvement: Watchtower, cost: 12},
		{improvement: Fort, cost: 24},
		{improvement: Sawmill, cost: 3},
	]
}

class Hills {
	id = 4
	name = "Hills"
	ExpTime = 1
	PrepTime = 1
	PrepCost = 2
	canBuild = [
		{improvement: Road, cost: 3},
		{improvement: Aqueduct, cost: 3},
		{improvement: Highway, cost: 3},
		{improvement: Bridge, cost: 3},
		{improvement: Fishery, cost: 4},
		{improvement: Watchtower, cost: 12},
		{improvement: Fort, cost: 24},
		{improvement: Canal, cost: 6},
		{improvement: Farm, cost: 4},
		{improvement: Mine, cost: 6},
		{improvement: Quarry, cost: 6},
	]
}

class Jungle {
	id = 5
	name = "Jungle"
	ExpTime = 2
	PrepTime = 4
	PrepCost = 12
	canBuild = [
		{improvement: Road, cost: 4},
		{improvement: Aqueduct, cost: 4},
		{improvement: Highway, cost: 4},
		{improvement: Bridge, cost: 4},
		{improvement: Fishery, cost: 4},
		{improvement: Watchtower, cost: 12},
		{improvement: Fort, cost: 24},
		{improvement: Sawmill, cost: 3},
	]
}

class Marsh {
	id = 6
	name = "Marsh"
	ExpTime = 3
	PrepTime = 3
	PrepCost = 8
	canBuild = [
		{improvement: Road, cost: 4},
		{improvement: Aqueduct, cost: 4},
		{improvement: Highway, cost: 4},
		{improvement: Bridge, cost: 4},
		{improvement: Fishery, cost: 4},
		{improvement: Watchtower, cost: 12},
		{improvement: Fort, cost: 24},
	]
}

class Mountains {
	id = 7
	name = "Mountains"
	ExpTime = 3
	PrepTime = 4
	PrepCost = 12
	canBuild = [
		{improvement: Road, cost: 4},
		{improvement: Aqueduct, cost: 4},
		{improvement: Highway, cost: 4},
		{improvement: Bridge, cost: 4},
		{improvement: Fishery, cost: 4},
		{improvement: Watchtower, cost: 12},
		{improvement: Fort, cost: 24},
		{improvement: Mine, cost: 6},
		{improvement: Quarry, cost: 6},
	]
}

class Plains {
	id = 8
	name = "Plains"
	ExpTime = 1
	PrepTime = 0
	PrepCost = 1
	canBuild = [
		{improvement: Road, cost: 1},
		{improvement: Aqueduct, cost: 1},
		{improvement: Highway, cost: 1},
		{improvement: Bridge, cost: 1},
		{improvement: Fishery, cost: 4},
		{improvement: Watchtower, cost: 12},
		{improvement: Fort, cost: 24},
		{improvement: Canal, cost: 2},
		{improvement: Farm, cost: 2},
	]
}

class Water {
	id = 9
	name = "Water"
	ExpTime = 2
	PrepTime = -1
	PrepCost = -1
	canBuild = [
		{improvement: Fishery, cost: 4},
	]
}

class TerrainList {
	static list = [
		new Cavern(),
		new Desert(),
		new Forest(),
		new Hills(),
		new Jungle(),
		new Marsh(),
		new Mountains(),
		new Plains(),
		new Water(),
	]
	static extraImprovements=[
		{improvement:Lair, cost:0},
		{improvement:Landmark, cost:0},
		{improvement:Resource, cost:0},
		{improvement:River, cost:0}
	]
	static getById = (id) => {
		for (let i = 0; i < TerrainList.list.length; i++) {
			if (TerrainList.list[i].id === id)
				return TerrainList.list[i]
		}
		return null
	}
	static getByName = (name) => {
		for (let i = 0; i < TerrainList.list.length; i++) {
			if (TerrainList.list[i].name === name) {
				return TerrainList.list[i]
			}
		}
		return null
	}
}

export {Cavern, Desert, Forest, Hills, Jungle, Marsh, Mountains, Plains, Water}
export {TerrainList}