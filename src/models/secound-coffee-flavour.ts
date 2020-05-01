import CoffeeFlavour from "./coffee-flavour";
import { Subject } from "rxjs";

export default class SecoundCoffeeFlavour extends CoffeeFlavour {
	public static myStream: Subject<string> = new Subject<string>();
	constructor(
		id: string,
		typeOfFlavour: string,
		private _parrentFlavourId: string
	) {
		super(id, typeOfFlavour);
	}

	addIdToSubject(): void {
		SecoundCoffeeFlavour.myStream.next(this.id);
	}

	get parrentFlavourId(): string {
		return this._parrentFlavourId;
	}

	static createCoffeeFlavour(DTO: any): SecoundCoffeeFlavour {
		return new SecoundCoffeeFlavour(
			DTO["id"],
			DTO["flavour"],
			DTO["firstCoffeeFlavourId"]
		);
	}
}
