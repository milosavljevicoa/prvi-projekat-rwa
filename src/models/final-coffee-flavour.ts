import CoffeeFlavour from "./coffee-flavour";
import { Subject } from "rxjs";

export default class FinalCoffeeFlavour extends CoffeeFlavour {
	public static myStream: Subject<string> = new Subject<string>();
	constructor(
		id: string,
		typeOfFlavour: string,
		private _parrentFlavourId: string
	) {
		super(id, typeOfFlavour);
	}

	protected textInButton(): string {
		return this._typeOfFlavour;
	}

	addIdToSubject(): void {
		FinalCoffeeFlavour.myStream.next(this.id);
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
