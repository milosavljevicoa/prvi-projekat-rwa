import CoffeeFlavour from "./coffee-flavour";
import { Subject } from "rxjs";

export default class PrimaryCoffeeFlavour extends CoffeeFlavour {
	public static myStream: Subject<string> = new Subject<string>();
	constructor(id: string, typeOfFlavour: string) {
		super(id, typeOfFlavour);
	}

	addIdToSubject(): void {
		PrimaryCoffeeFlavour.myStream.next(this.id);
	}

	protected textInButton(): string {
		return this._typeOfFlavour;
	}

	get parrentFlavourId(): string {
		return "0";
	}

	static createCoffeeFlavour(DTO: any): PrimaryCoffeeFlavour {
		return new PrimaryCoffeeFlavour(DTO["id"], DTO["flavour"]);
	}
}
