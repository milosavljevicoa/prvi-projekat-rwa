import CoffeeFlavourList from "./coffee-flavour-list";
import CoffeeFlavour from "../../models/coffee-flavour";
import { Observable, Subject } from "rxjs";
import { concatAll, take, switchMap, filter } from "rxjs/operators";
import { fetchSecondTypeFlavours } from "../../services/fetch-from-databse";
import PrimaryCoffeeFlavour from "../../models/primary-coffee-flavour";
import FinalCoffeeFlavourList from "./final-coffee-flavour-list";

class SecondaryCoffeeFlavourList extends CoffeeFlavourList {
	private isSecondaryFlavourPicked: boolean = false;

	constructor(private _finalCoffeeFlavourList: FinalCoffeeFlavourList) {
		super(<HTMLDivElement>document.getElementById("second-type"));
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return PrimaryCoffeeFlavour.myStream.pipe(
			switchMap((id: string) => {
				return fetchSecondTypeFlavours().pipe(
					concatAll(),
					filter((flavour: CoffeeFlavour) => flavour.parrentFlavourId === id)
				);
			})
		);
	}

	protected subscribeToObservable(observable: Observable<CoffeeFlavour>): void {
		observable.subscribe((flavour: CoffeeFlavour) => {
			const buttonFlavour: HTMLButtonElement = flavour.drawButtonAsListItem(
				this._list
			);
			buttonFlavour.onclick = () => {
				if (this.isSecondaryFlavourPicked)
					this._finalCoffeeFlavourList.clearList();
				else {
					this.isSecondaryFlavourPicked = true;
					this._finalCoffeeFlavourList.drawCoffeeList(
						"Now pick the depth of flavour for your coffee"
					);
				}
				flavour.addIdToSubject();
			};
		});
	}

	public clearList(): void {
		this._list.innerHTML = "";
		this._finalCoffeeFlavourList.clearList();
	}
}

export default SecondaryCoffeeFlavourList;
