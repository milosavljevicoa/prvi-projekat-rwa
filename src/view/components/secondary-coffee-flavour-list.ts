//rxjs
import { Observable } from "rxjs";
import { concatAll, switchMap, filter } from "rxjs/operators";
//flavours
import CoffeeFlavour from "../../models/coffee-flavour";
import PrimaryCoffeeFlavour from "../../models/primary-coffee-flavour";
//coffee flavour list
import ChildsCoffeeFlavourLists from "./abstract-classes/childs-coffee-flavour-list";
import FinalCoffeeFlavourList from "./final-coffee-flavour-list";
//database access functions
import { fetchSecondaryTypeFlavours } from "../../services/fetch-from-databse";

class SecondaryCoffeeFlavourList extends ChildsCoffeeFlavourLists {
	private isSecondaryFlavourPicked: boolean = false;
	private secondaryCoffeeFlavours: Observable<Array<CoffeeFlavour>>;

	constructor(private _finalCoffeeFlavourList: FinalCoffeeFlavourList) {
		super(<HTMLDivElement>document.getElementById("second-type"));
		this.secondaryCoffeeFlavours = fetchSecondaryTypeFlavours();
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return PrimaryCoffeeFlavour.selectedFlavours.pipe(
			switchMap((id: string) => {
				return this.secondaryCoffeeFlavours.pipe(
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
