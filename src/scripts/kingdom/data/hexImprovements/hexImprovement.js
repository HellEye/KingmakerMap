class HexImprovement {
	id=0
	name="hex improvement"
	// for varied costs just write the lowest one for now (ex. road)
	cost=0
	terrain=["Desert", "Hill"]
	bonus={
		economy:0,
		loyalty:0,
		stability:0,
		unrest:0,
		//for farms etc put negative values
		consumption:0,
	}
	//Just write down anything that's not a bonus to stats
	effect=""
	// would be nice to have Special Terrain features here for every type of improvement
	// ex for farm "decreseases consumption by an additional 1BP when built on a resource"

	special=""
}
export default HexImprovement