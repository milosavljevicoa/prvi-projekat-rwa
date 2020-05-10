class CoffeeFlavour {
	constructor(
		private _id: string,
		private _typeOfFlavour: string,
		private _childFlavoursIds: Array<string>
	) {}

	get id(): string {
		return this._id;
	}

	get typeOfFlavour(): string {
		return this._typeOfFlavour;
	}

	get childFlavoursIds(): Array<string> {
		return this._childFlavoursIds;
	}

	get valueForButton(): string {
		return this._childFlavoursIds.reduce((acc, v) => (acc = acc + "," + v));
	}
}

export default CoffeeFlavour;
