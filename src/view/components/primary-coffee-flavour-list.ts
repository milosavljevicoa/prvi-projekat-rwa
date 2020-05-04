//rxjs
import { Observable } from "rxjs";
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

	constructor(private secondaryCoffeeLavourList: SecondaryCoffeeFlavourList) {
		super(<HTMLDivElement>document.getElementById("first-type"));
		this.primaryCoffeeFlavours = fetchPrimaryTypeFlavours();
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return this.primaryCoffeeFlavours.pipe(take(1), concatAll());
	}

	protected subscribeToObservable(observable: Observable<CoffeeFlavour>): void {
		observable.subscribe((flavour: CoffeeFlavour) => {
			const buttonFlavour: HTMLButtonElement = flavour.drawButtonAsListItem(
				this._list
			);
			buttonFlavour.onclick = () => {
				if (this.isPrimaryFlavourPicked)
					this.secondaryCoffeeLavourList.clearList();
				else {
					this.isPrimaryFlavourPicked = true;
					this.secondaryCoffeeLavourList.drawCoffeeList(
						"What flavour profile would you like"
					);
				}
				flavour.addIdToSubject();
			};
		});
	}
}

export default PrimaryCoffeeFlavourList;
