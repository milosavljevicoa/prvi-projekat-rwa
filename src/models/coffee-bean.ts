import CoffeeFlavour from "./coffee-flavour";

class CoffeeBean {
	constructor(
		private _typeOfFlavour: string,
		private _parrentFlavoursIds: Array<string>,
		private _urlToCoffeeBean: string
	) {}

	public get parrentFlavoursIds(): Array<string> {
		return this._parrentFlavoursIds;
	}

	public get typeOfCoffeeBean(): string {
		return this._typeOfFlavour;
	}

	public get urlToCoffeeBean(): string {
		return this._urlToCoffeeBean;
	}

	public static createNotFoundCoffeeBean(): CoffeeBean {
		return new CoffeeBean("Not found", new Array<string>(), "");
	}
}

export default CoffeeBean;
