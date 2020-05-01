import CoffeeFlavour from "./coffee-flavour";
import { Subject } from "rxjs";

export default class FirstCoffeeFlavour extends CoffeeFlavour {
	public static myStream: Subject<string> = new Subject<string>();
	constructor(id: string, typeOfFlavour: string) {
		super(id, typeOfFlavour);
	}

	addIdToSubject(): void {
		FirstCoffeeFlavour.myStream.next(this.id);
	}

	static createCoffeeFlavour(DTO: any): FirstCoffeeFlavour {
		return new FirstCoffeeFlavour(DTO["id"], DTO["flavour"]);
	}
}
