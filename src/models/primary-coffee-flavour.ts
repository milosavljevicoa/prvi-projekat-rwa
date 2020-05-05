import CoffeeFlavour from "./coffee-flavour";
import { Subject } from "rxjs";

export default class PrimaryCoffeeFlavour extends CoffeeFlavour {
	constructor(id: string, typeOfFlavour: string) {
		super(id, typeOfFlavour);
	}

	get parrentFlavourId(): string {
		return "0";
	}

	static createCoffeeFlavour(DTO: any): PrimaryCoffeeFlavour {
		return new PrimaryCoffeeFlavour(DTO["id"], DTO["flavour"]);
	}
}
