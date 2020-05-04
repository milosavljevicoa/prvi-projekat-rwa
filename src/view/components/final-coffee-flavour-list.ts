//rxjs
import { Observable } from "rxjs";
import { switchMap, concatAll, filter } from "rxjs/operators";
//flavours
import SecondaryCoffeeFlavour from "../../models/secondary-coffee-flavour";
import CoffeeFlavour from "../../models/coffee-flavour";
//coffee flavour list
import ChildsCoffeeFlavourLists from "./abstract-classes/childs-coffee-flavour-list";
import CoffeeBeansList from "./coffee-beans-list";
//database access functions
import { fetchFinalTypeFlavours } from "../../services/fetch-from-databse";

class FinalCoffeeFlavourList extends ChildsCoffeeFlavourLists {
	private _isFinalCoffeeFlavourPicked: boolean = false;
	private finalCoffeeFlavours: Observable<Array<CoffeeFlavour>>;

	constructor(private _coffeeBeansList: CoffeeBeansList) {
		super(<HTMLDivElement>document.getElementById("final-type"));
		this.finalCoffeeFlavours = fetchFinalTypeFlavours();
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return SecondaryCoffeeFlavour.selectedFlavours.pipe(
			switchMap((id: string) => {
				return this.finalCoffeeFlavours.pipe(
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
				if (this._isFinalCoffeeFlavourPicked) this._coffeeBeansList.clearList();
				else {
					this._isFinalCoffeeFlavourPicked = true;
					this._coffeeBeansList.drawCoffeeList(
						"Here is the link to your perfect coffee beans"
					);
				}
				flavour.addIdToSubject();
			};
		});
	}

	public clearList() {
		this._list.innerHTML = "";
		this._coffeeBeansList.clearList();
	}
}

export default FinalCoffeeFlavourList;
