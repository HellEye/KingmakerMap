import { BuildingList } from "../buildings/buildings"

export class BuildingDetails {
	building = null
	x = 0
	y = 0
	rotation = 0
	buildingGrid = null

	constructor(obj, grid) {
		this.building = BuildingList.getById(obj.building)
		this.x = obj.x
		this.y = obj.y
		this.rotation = obj.rotation
		this.buildingGrid = grid
	}

	toJson = () => {
		return {
			x: this.x,
			y: this.y,
			rotation: this.rotation,
			building: this.building.id,
		}
	}

	toFormData = () => {
		const formData = new FormData()
		formData.append("building", this.building.id.toString())
		formData.append("xcoord", this.x.toString())
		formData.append("ycoord", this.y.toString())
		formData.append("rotation", this.rotation.toString())
		formData.append("district", this.buildingGrid.district.id.toString())
		return formData
	}
}
