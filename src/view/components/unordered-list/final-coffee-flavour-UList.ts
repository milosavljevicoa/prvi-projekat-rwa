//rxjs
import { Observable, Subject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
//view
import CoffeeFlavourUList from "./abstract-class/coffee-flavour-UList";
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
//models
import CoffeeFlavour from "../../../models/coffee-flavour";
//database functions
import { fetchFinalTypeFlavours } from "../../../services/fetch-from-databse";

class FinalCoffeeFlavourUList extends CoffeeFlavourUList {
	constructor(private _myIdsToDisplay: Subject<Array<string>>) {
		super(<HTMLDivElement>document.getElementById("final-type"));
	}

	protected configureObservable(): Observable<CoffeeFlavourListItem> {
		return this._myIdsToDisplay.pipe(
			switchMap((idsToDisplay: Array<string>) => {
				this.clearList();
				return fetchFinalTypeFlavours(idsToDisplay);
			}),
			map(
				(coffeeFlavour: CoffeeFlavour) =>
					new CoffeeFlavourListItem(this.uList, coffeeFlavour)
			)
		);
	}
}

export default FinalCoffeeFlavourUList;
