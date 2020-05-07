//rxjs
import { Observable, Subject } from "rxjs";
import { take, concatAll, map, switchMap, filter } from "rxjs/operators";
//view
import CoffeeFlavourUList from "./coffee-flavour-UList";
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
//models
import CoffeeFlavour from "../../../models/coffee-flavour";
//database functions
import { fetchFinalTypeFlavours } from "../../../services/fetch-from-databse";

class FinalCoffeeFlavourUList extends CoffeeFlavourUList {
	constructor(private _secondaryCoffeeFlavourStream: Subject<Array<string>>) {
		super(<HTMLDivElement>document.getElementById("final-type"));
	}

	protected configureObservable(
		streamOfFlavours: Observable<Array<CoffeeFlavour>>
	): Observable<CoffeeFlavourListItem> {
		// this.clearList();
		return this._secondaryCoffeeFlavourStream.pipe(
			switchMap((secondaryFlavoursId: Array<string>) => {
				this.clearList();
				return streamOfFlavours.pipe(
					take(1),
					concatAll(),
					filter((flavour: CoffeeFlavour) => {
						return (
							secondaryFlavoursId.filter(
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

		this.selectedFlavoursIds.next(selectedIds);
	};

	protected fetchObservableFromDb(): Observable<Array<CoffeeFlavour>> {
		return fetchFinalTypeFlavours();
	}
}

export default FinalCoffeeFlavourUList;
