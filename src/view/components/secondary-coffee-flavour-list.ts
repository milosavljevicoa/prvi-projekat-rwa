//rxjs
import { Observable, Subject } from "rxjs";
import { concatAll, switchMap, filter } from "rxjs/operators";
//flavours
import CoffeeFlavour from "../../models/coffee-flavour";
import PrimaryCoffeeFlavour from "../../models/primary-coffee-flavour";
//coffee flavour list
import ChildsCoffeeFlavourLists from "./abstract-classes/childs-coffee-flavour-list";
import FinalCoffeeFlavourList from "./final-coffee-flavour-list";
//database access functions
import { fetchSecondaryTypeFlavours } from "../../services/fetch-from-databse";
import PrimaryCoffeeFlavourList from "./primary-coffee-flavour-list";

class SecondaryCoffeeFlavourList extends ChildsCoffeeFlavourLists {
	private isSecondaryFlavourPicked: boolean = false;
	private secondaryCoffeeFlavours: Observable<Array<CoffeeFlavour>>;
	public static checkedSecondaryCoffeeFlavours: Subject<
		Array<string>
	> = new Subject();
	private parrentIdsToDisplay: Array<string> = new Array();

	constructor(private _finalCoffeeFlavourList: FinalCoffeeFlavourList) {
		super(<HTMLDivElement>document.getElementById("second-type"));
		this.secondaryCoffeeFlavours = fetchSecondaryTypeFlavours();
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return PrimaryCoffeeFlavourList.checkedPrimaryCoffeeFlavours.pipe(
			switchMap((ids: Array<string>) => {
				return this.secondaryCoffeeFlavours.pipe(
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
			//TODO implement checked input when changing parrent flavour
			// this._selectedIds.forEach((id: string) => {
			// 	if (flavour.id === id) checkInputFlavour.checked = true;
			// });
			checkInputFlavour.onclick = (event) => {
				if (this.isSecondaryFlavourPicked) {
					this._finalCoffeeFlavourList.clearList();
				} else {
					this.isSecondaryFlavourPicked = true;
					this._finalCoffeeFlavourList.drawCoffeeList(
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
				SecondaryCoffeeFlavourList.checkedSecondaryCoffeeFlavours.next(
					this._selectedIds
				);
				console.log(
					this._selectedIds,
					"selected ids of secondary coffee flavours"
				);
			};
		});
	}

	public clearList(parrentIdsToDisplay: Array<string>): void {
		//this part is commented so i know what i have been working on
		// this.parrentIdsToDisplay = parrentIdsToDisplay;
		// this._selectedIds = this._selectedIds.filter((selectedId: string) => {
		// 	return this.parrentIdsToDisplay.filter((parrentId: string) => {
		// 		console.log(parrentId);
		// 		return true;
		// 	});
		// });
		// console.log(this._selectedIds);
		// let childNodes = this._list.childNodes;

		// console.log(childNodes);
		// this._list.removeChild();
		// SecondaryCoffeeFlavourList.checkedSecondaryCoffeeFlavours.next(["2"]);
		//take all element and check which is checked
		// console.log(this._list.querySelectorAll("input"));
		//subject ostaje nepromenjen, treba ga ovde nekako izmeniti
		// SecondaryCoffeeFlavourList.checkedSecondaryCoffeeFlavours.next(["0"]);

		this._selectedIds.length = 0;
		this._list.innerHTML = "";
		this._finalCoffeeFlavourList.clearList();
	}
}

export default SecondaryCoffeeFlavourList;
