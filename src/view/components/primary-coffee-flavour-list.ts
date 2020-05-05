//rxjs
import { Observable, Subject } from "rxjs";
import { take, concatAll } from "rxjs/operators";
//flavours
import CoffeeFlavour from "../../models/coffee-flavour";
//coffee flavour list
import CoffeeFlavourList from "./abstract-classes/coffee-flavour-list";
import SecondaryCoffeeFlavourList from "./secondary-coffee-flavour-list";
//database access functions
import { fetchPrimaryTypeFlavours } from "../../services/fetch-from-databse";

class PrimaryCoffeeFlavourList extends CoffeeFlavourList {
	private isPrimaryFlavourPicked: boolean = false;
	private primaryCoffeeFlavours: Observable<Array<CoffeeFlavour>>;
	private static containerDivId: string = "first-type";
	public static checkedPrimaryCoffeeFlavours: Subject<
		Array<string>
	> = new Subject();

	constructor(private secondaryCoffeeLavourList: SecondaryCoffeeFlavourList) {
		super(
			<HTMLDivElement>(
				document.getElementById(PrimaryCoffeeFlavourList.containerDivId)
			)
		);
		this.primaryCoffeeFlavours = fetchPrimaryTypeFlavours();
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return this.primaryCoffeeFlavours.pipe(take(1), concatAll());
	}

	protected subscribeToObservable(observable: Observable<CoffeeFlavour>): void {
		observable.subscribe((flavour: CoffeeFlavour) => {
			const checkInputFlavour: HTMLInputElement = flavour.drawChechInputAsListItem(
				this._list
			);
			checkInputFlavour.onclick = (event) => {
				if (this.isPrimaryFlavourPicked)
					this.secondaryCoffeeLavourList.clearList(this._selectedIds);
				else {
					this.isPrimaryFlavourPicked = true;
					this.secondaryCoffeeLavourList.drawCoffeeList(
						"What flavour profile would you like"
					);
				}
				if (checkInputFlavour.checked) {
					this._selectedIds.push(flavour.id);
				} else {
					this._selectedIds = this._selectedIds.filter(
						(id: string) => id !== flavour.id
					);
				}
				PrimaryCoffeeFlavourList.checkedPrimaryCoffeeFlavours.next(
					this._selectedIds
				);
			};
		});
	}
}

export default PrimaryCoffeeFlavourList;
