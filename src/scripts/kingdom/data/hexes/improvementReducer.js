export function improvementReducer(acc, improvement) {
	acc.economy += improvement.bonus.economy
	acc.stability += improvement.bonus.stability
	acc.loyalty += improvement.bonus.loyalty
	acc.unrest += improvement.bonus.unrest
	acc.consumption += improvement.bonus.consumption
	acc.bp += improvement.bonus.bp
	return acc
}
