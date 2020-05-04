import CoffeeFlavour from "./coffee-flavour";
import { Subject } from "rxjs";

export default class PrimaryCoffeeFlavour extends CoffeeFlavour {
	public static selectedFlavours: Subject<string> = new Subject<string>();
	constructor(id: string, typeOfFlavour: string) {
		super(id, typeOfFlavour);
	}

	addIdToSubject(): void {
		PrimaryCoffeeFlavour.selectedFlavours.next(this.id);
	}

	get parrentFlavourId(): string {
		return "0";
	}

	static createCoffeeFlavour(DTO: any): PrimaryCoffeeFlavour {
		return new PrimaryCoffeeFlavour(DTO["id"], DTO["flavour"]);
	}
}
