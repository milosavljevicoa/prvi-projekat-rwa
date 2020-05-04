import CoffeeFlavour from "./coffee-flavour";
import { Subject } from "rxjs";

export default class SecondaryCoffeeFlavour extends CoffeeFlavour {
	public static selectedFlavours: Subject<string> = new Subject<string>();
	constructor(
		id: string,
		typeOfFlavour: string,
		private _parrentFlavourId: string
	) {
		super(id, typeOfFlavour);
	}

	addIdToSubject(): void {
		SecondaryCoffeeFlavour.selectedFlavours.next(this.id);
	}

	get parrentFlavourId(): string {
		return this._parrentFlavourId;
	}

	static createCoffeeFlavour(DTO: any): SecondaryCoffeeFlavour {
		return new SecondaryCoffeeFlavour(
			DTO["id"],
			DTO["flavour"],
			DTO["firstCoffeeFlavourId"]
		);
	}
}
