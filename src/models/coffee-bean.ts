import CoffeeFlavour from "./coffee-flavour";

class CoffeeBean extends CoffeeFlavour {
	constructor(
		id: string,

		typeOfFlavour: string,

		private _urlToCoffeeBean: string
	) {
		super(id, typeOfFlavour, [""]);
	}

	public get urlToCoffeeBean(): string {
		return this._urlToCoffeeBean;
	}

	get valueForButton(): string {
		return this.typeOfFlavour + "," + this._urlToCoffeeBean;
	}
}

export default CoffeeBean;
