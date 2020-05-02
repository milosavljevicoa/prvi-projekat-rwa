import CoffeeFlavour from "./coffee-flavour";
import { Subject } from "rxjs";

export default class SecondaryCoffeeFlavour extends CoffeeFlavour {
	public static myStream: Subject<string> = new Subject<string>();
	constructor(
		id: string,
		typeOfFlavour: string,
		private _parrentFlavourId: string
	) {
		super(id, typeOfFlavour);
	}

	addIdToSubject(): void {
		SecondaryCoffeeFlavour.myStream.next(this.id);
	}

	protected textInButton(): string {
		return this._typeOfFlavour;
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
