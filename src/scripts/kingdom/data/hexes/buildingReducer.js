
export function buildingReducer(acc, building) {
	acc.economy += building.bonus.economy;
	acc.stability += building.bonus.stability;
	acc.loyalty += building.bonus.loyalty;
	acc.defense += building.bonus.defense;
	acc.unrest += building.bonus.unrest;
	acc.fame += building.bonus.fame;
	return acc;
}
