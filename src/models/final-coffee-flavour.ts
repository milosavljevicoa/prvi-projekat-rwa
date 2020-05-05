import { Subject } from "rxjs";
import CoffeeFlavour from "./coffee-flavour";

export default class FinalCoffeeFlavour extends CoffeeFlavour {
	constructor(
		id: string,
		typeOfFlavour: string,
		private _parrentFlavourId: string
	) {
		super(id, typeOfFlavour);
	}

	get parrentFlavourId(): string {
		return this._parrentFlavourId;
	}

	static createCoffeeFlavour(DTO: any): FinalCoffeeFlavour {
		return new FinalCoffeeFlavour(
			DTO["id"],
			DTO["flavour"],
			DTO["secondCoffeeFlavourId"]
		);
	}
}
