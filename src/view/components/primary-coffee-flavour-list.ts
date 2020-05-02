import CoffeeFlavourList from "./coffee-flavour-list";
import { Observable, Subject } from "rxjs";
import CoffeeFlavour from "../../models/coffee-flavour";
import { take, concatAll } from "rxjs/operators";
import SecondaryCoffeeFlavourList from "./secondary-coffee-flavour-list";
import { fetchFirstTypeFlavours } from "../../services/fetch-from-databse";

class PrimaryCoffeeFlavourList extends CoffeeFlavourList {
	private isPrimaryFlavourPicked: boolean = false;

	constructor(private secondaryCoffeeLavourList: SecondaryCoffeeFlavourList) {
		super(<HTMLDivElement>document.getElementById("first-type"));
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return fetchFirstTypeFlavours().pipe(take(1), concatAll());
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
						"Now pick with a bit more detail"
					);
				}
				flavour.addIdToSubject();
			};
		});
	}

	public clearList(): void {}
}

export default PrimaryCoffeeFlavourList;
