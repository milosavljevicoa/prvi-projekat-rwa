import CoffeeFlavourList from "./coffee-flavour-list";
import { fetchFinalTypeFlavours } from "../../services/fetch-from-databse";
import SecondaryCoffeeFlavour from "../../models/secondary-coffee-flavour";
import { switchMap, concatAll, filter } from "rxjs/operators";
import CoffeeFlavour from "../../models/coffee-flavour";
import { Observable } from "rxjs";
import CoffeeBeansList from "./coffee-beans-list";

class FinalCoffeeFlavourList extends CoffeeFlavourList {
	private _isFinalCoffeeFlavourPicked: boolean = false;
	constructor(private _coffeeBeansList: CoffeeBeansList) {
		super(<HTMLDivElement>document.getElementById("final-type"));
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return SecondaryCoffeeFlavour.myStream.pipe(
			switchMap((id: string) => {
				return fetchFinalTypeFlavours().pipe(
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
