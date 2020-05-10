//rxjs
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
//view
import CoffeeFlavourUList from "./abstract-class/coffee-flavour-UList";
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
//models
import CoffeeFlavour from "../../../models/coffee-flavour";
//database access functions
import { fetchPrimaryTypeFlavours } from "../../../services/fetch-from-databse";

class PrimaryCoffeeUList extends CoffeeFlavourUList {
	constructor() {
		super(<HTMLDivElement>document.getElementById("primary-type"));
	}

	protected configureObservable(): Observable<CoffeeFlavourListItem> {
		return fetchPrimaryTypeFlavours().pipe(
			map((flavour: CoffeeFlavour) => {
				return new CoffeeFlavourListItem(this.uList, flavour);
			})
		);
	}
}

export default PrimaryCoffeeUList;
