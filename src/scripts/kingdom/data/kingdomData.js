class KingdomData {
    data = {
        alignment : 0,
        economy : 0,
        stability : 0,
        loyalty : 0,
        unrest : 0,
        consumption : 0,
        consumptionModifier : 0,
        size : 0,
        treasury : 0,
        positions : {
            ruler: 0,
            rulerSelectedAttributes: {
                stability: false,
                loyalty: false,
                economy: false
            },
            consort: 0,
            councilor: 0,
            general: 0,
            grandDiplomat: 0,
            heir: 0,
            highPriest: 0,
            magister: 0,
            marshal: 0,
            royalEnforcer: 0,
            spymaster: 0,
            spymasterSelectedAttribute: {
                stability: false,
                loyalty: false,
                economy: false
            },
            treasurer: 0,
            viceroy: 0,
            warden: 0
        }
    }

    getEconomy() {
        return (
            this.data.economy +
            this.data.positions.rulerSelectedAttributes.economy * this.data.positions.ruler +
            this.data.positions.spymaster * this.data.positions.spymasterSelectedAttribute.economy +
            this.data.positions.magister +
            this.data.positions.marshal +
            this.data.positions.treasurer +
            Math.floor(this.data.positions.viceroy / 2) +
            (this.data.alignment % 3 === 2) ? 2 : 0 +
            (Math.floor(this.data.alignment / 3) === 0) ? 2 : 0

        )
    }

    getStability() {
        return (this.data.stability +
            this.data.positions.rulerSelectedAttributes.stability * this.data.positions.ruler +
            this.data.positions.spymaster * this.data.positions.spymasterSelectedAttribute.stability +
            this.data.positions.general +
            this.data.positions.grandDiplomat +
            this.data.positions.highPriest +
            (this.data.alignment % 3 === 1) ? 2 : 0 +
            (Math.floor(this.data.alignment / 3) === 1) ? 2 : 0
        )

    }

    getLoyalty() {
        return (this.data.loyalty +
            this.data.positions.rulerSelectedAttributes.loyalty * this.data.positions.ruler +
            this.data.positions.spymaster * this.data.positions.spymasterSelectedAttribute.loyalty +
            this.data.positions.consort / 2 +
            this.data.positions.councilor +
            this.data.positions.heir / 2 +
            this.data.positions.royalEnforcer +
            this.data.positions.warden +
            (this.data.alignment % 3 === 0) ? 2 : 0 +
            (Math.floor(this.data.alignment / 3) === 2) ? 2 : 0
        )
    }

    getConsumption() {
        return this.data.consumptionModifier > this.data.consumption + this.data.size ? 0 : this.data.consumption + this.data.size - this.data.consumptionModifier
    }

}

export default KingdomData