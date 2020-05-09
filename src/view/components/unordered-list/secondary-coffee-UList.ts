//rxjs
import { Observable, Subject } from "rxjs";
import { take, concatAll, map, switchMap, filter } from "rxjs/operators";
//view
import CoffeeFlavourUList from "./coffee-flavour-UList";
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
//models
import CoffeeFlavour from "../../../models/coffee-flavour";
//database access functions
import { fetchSecondaryTypeFlavours } from "../../../services/fetch-from-databse";

class SecondaryCoffeeUList extends CoffeeFlavourUList {
	constructor(private _primaryCoffeeFlavourStream: Subject<Array<string>>) {
		super(<HTMLDivElement>document.getElementById("secondary-type"));
	}

	protected configureObservable(
		streamOfFlavours: Observable<Array<CoffeeFlavour>>
	): Observable<CoffeeFlavourListItem> {
		return this._primaryCoffeeFlavourStream.pipe(
			switchMap((primaryFlavoursid: Array<string>) => {
				this.clearList();
				return streamOfFlavours.pipe(
					take(1),
					concatAll(),
					filter((flavour: CoffeeFlavour) => {
						return (
							primaryFlavoursid.filter(
								(id: string) => id === flavour.parrentFlavourId
							).length !== 0
						);
					}),
					map((flavour: CoffeeFlavour) => {
						return new CoffeeFlavourListItem(this.uList, flavour);
					})
				);
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
		return fetchSecondaryTypeFlavours();
	}
}

export default SecondaryCoffeeUList;
