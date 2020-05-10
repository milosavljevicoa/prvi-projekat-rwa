//rxjs
import { Subject, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
//view
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
import CoffeeFlavourUList from "./abstract-class/coffee-flavour-UList";
//models
import CoffeeBean from "../../../models/coffee-bean";
//database functions
import { fetchCoffeeBean } from "../../../services/fetch-from-databse";

class CoffeeBeanUList extends CoffeeFlavourUList {
	constructor(private _finalCoffeeFlavourStream: Subject<Array<string>>) {
		super(<HTMLDivElement>document.getElementById("coffee-beans"));
	}

	protected configureObservable(): Observable<CoffeeFlavourListItem> {
		return this._finalCoffeeFlavourStream.pipe(
			switchMap((coffeeBeanIds: Array<string>) => {
				this.clearList();
				return fetchCoffeeBean(coffeeBeanIds);
			}),
			map(
				(coffeeFlavour: CoffeeBean) =>
					new CoffeeFlavourListItem(this.uList, coffeeFlavour)
			)
		);
	}
}

export default CoffeeBeanUList;
