
export class Marker {
	constructor(obj) {
		this.id = obj._id;
		this.position.x = obj.x;
		this.position.y = obj.y;
		this.color = obj.color;
	}

	id = -1;
	position = {
		x: 0,
		y: 0
	};
	color = "";
	toFormData = () => {
		const formData = new FormData();
		formData.append("xcoord", this.position.x.toString());
		formData.append("ycoord", this.position.y.toString());
		formData.append("color", this.color);
		return formData;
	};
	toJson = () => {
		return JSON.stringify(this);
	};
}
