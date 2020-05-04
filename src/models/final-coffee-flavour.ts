import { Subject } from "rxjs";
import CoffeeFlavour from "./coffee-flavour";

export default class FinalCoffeeFlavour extends CoffeeFlavour {
	public static selectedFlavours: Subject<string> = new Subject<string>();
	constructor(
		id: string,
		typeOfFlavour: string,
		private _parrentFlavourId: string
	) {
		super(id, typeOfFlavour);
	}

	addIdToSubject(): void {
		FinalCoffeeFlavour.selectedFlavours.next(this.id);
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
