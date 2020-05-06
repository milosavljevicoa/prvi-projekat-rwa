class CoffeeFlavour {
	constructor(
		private _id: string,
		private _typeOfFlavour: string,
		private _parrentFlavourId: string
	) {}

	get id(): string {
		return this._id;
	}

	get typeOfFlavour(): string {
		return this._typeOfFlavour;
	}

	get parrentFlavourId(): string {
		return this._parrentFlavourId;
	}
}

export default CoffeeFlavour;
