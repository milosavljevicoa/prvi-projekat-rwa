//rxjs
import { Observable } from "rxjs";
import { take, concatAll, map } from "rxjs/operators";
//view
import CoffeeFlavourUList from "./coffee-flavour-UList";
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
//models
import CoffeeFlavour from "../../../models/coffee-flavour";
//database access functions
import { fetchPrimaryTypeFlavours } from "../../../services/fetch-from-databse";

class PrimaryCoffeeUList extends CoffeeFlavourUList {
	constructor() {
		super(<HTMLDivElement>document.getElementById("primary-type"));
	}

	protected configureObservable(
		streamOfFlavours: Observable<Array<CoffeeFlavour>>
	): Observable<CoffeeFlavourListItem> {
		return streamOfFlavours.pipe(
			take(1),
			concatAll(),
			map((flavour: CoffeeFlavour) => {
				return new CoffeeFlavourListItem(this.uList, flavour);
			})
		);
	}

	protected handleOnClickCheckBox = (listItem?: Event): void => {
		const selectedIds: Array<string> = this._coffeeFlavourListItems
			.filter((listItem: CoffeeFlavourListItem) => listItem.checkBox.checked)
			.map((listItem: CoffeeFlavourListItem) => listItem.coffeeFlavour.id);

		this._selectedFlavoursIds.next(selectedIds);
	};

	protected fetchObservableFromDb(): Observable<Array<CoffeeFlavour>> {
		return fetchPrimaryTypeFlavours();
	}
}

export default PrimaryCoffeeUList;
