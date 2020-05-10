//rxjs
import { Observable, Subject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
//view
import CoffeeFlavourUList from "./abstract-class/coffee-flavour-UList";
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
//models
import CoffeeFlavour from "../../../models/coffee-flavour";
//database access functions
import { fetchSecondaryTypeFlavours } from "../../../services/fetch-from-databse";

class SecondaryCoffeeUList extends CoffeeFlavourUList {
	constructor(private _myIdsToDisplay: Subject<Array<string>>) {
		super(<HTMLDivElement>document.getElementById("secondary-type"));
	}

	protected configureObservable(): Observable<CoffeeFlavourListItem> {
		return this._myIdsToDisplay.pipe(
			switchMap((idsToDisplay: Array<string>) => {
				this.clearList();
				return fetchSecondaryTypeFlavours(idsToDisplay);
			}),
			map(
				(coffeeFlavour: CoffeeFlavour) =>
					new CoffeeFlavourListItem(this.uList, coffeeFlavour)
			)
		);
	}
}

export default SecondaryCoffeeUList;
