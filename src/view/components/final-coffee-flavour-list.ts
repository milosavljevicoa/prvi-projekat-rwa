//rxjs
import { Observable, Subject } from "rxjs";
import { switchMap, concatAll, filter } from "rxjs/operators";
//flavours
import SecondaryCoffeeFlavour from "../../models/secondary-coffee-flavour";
import CoffeeFlavour from "../../models/coffee-flavour";
//coffee flavour list
import ChildsCoffeeFlavourLists from "./abstract-classes/childs-coffee-flavour-list";
import CoffeeBeansList from "./coffee-beans-list";
//database access functions
import { fetchFinalTypeFlavours } from "../../services/fetch-from-databse";
import SecondaryCoffeeFlavourList from "./secondary-coffee-flavour-list";

class FinalCoffeeFlavourList extends ChildsCoffeeFlavourLists {
	private _isFinalCoffeeFlavourPicked: boolean = false;
	private finalCoffeeFlavours: Observable<Array<CoffeeFlavour>>;
	public static checkedFinalCoffeeFlavours: Subject<
		Array<string>
	> = new Subject();

	constructor(private _coffeeBeansList: CoffeeBeansList) {
		super(<HTMLDivElement>document.getElementById("final-type"));
		this.finalCoffeeFlavours = fetchFinalTypeFlavours();
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return SecondaryCoffeeFlavourList.checkedSecondaryCoffeeFlavours.pipe(
			switchMap((ids: Array<string>) => {
				return this.finalCoffeeFlavours.pipe(
					concatAll(),
					filter((flavour: CoffeeFlavour) => {
						let flavourProfileSelected: boolean = false;
						ids.forEach((id: string) => {
							if (flavour.parrentFlavourId === id) {
								flavourProfileSelected = true;
							}
						});
						return flavourProfileSelected;
					})
				);
			})
		);
	}

	protected subscribeToObservable(observable: Observable<CoffeeFlavour>): void {
		observable.subscribe((flavour: CoffeeFlavour) => {
			const checkInputFlavour: HTMLInputElement = flavour.drawChechInputAsListItem(
				this._list
			);
			checkInputFlavour.onclick = () => {
				if (this._isFinalCoffeeFlavourPicked) this._coffeeBeansList.clearList();
				else {
					this._isFinalCoffeeFlavourPicked = true;
					this._coffeeBeansList.drawCoffeeList(
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
				FinalCoffeeFlavourList.checkedFinalCoffeeFlavours.next(
					this._selectedIds
				);
			};
		});
	}

	public clearList() {
		this._list.innerHTML = "";
		this._coffeeBeansList.clearList();
	}
}

export default FinalCoffeeFlavourList;
