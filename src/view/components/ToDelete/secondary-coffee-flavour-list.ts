// //rxjs
// import { Observable, Subject } from "rxjs";
// import { concatAll, switchMap, filter } from "rxjs/operators";
// //flavours
// import CoffeeFlavour from "../../../models/coffee-flavour";
// import PrimaryCoffeeFlavour from "../../../models/primary-coffee-flavour";
// //coffee flavour list
// import ChildsCoffeeFlavourLists from "./childs-coffee-flavour-list";
// // import FinalCoffeeFlavourList from "./final-coffee-flavour-list";
// //database access functions
// import { fetchSecondaryTypeFlavours } from "../../../services/fetch-from-databse";
// import PrimaryCoffeeFlavourList from "./primary-coffee-flavour-list";

// class SecondaryCoffeeFlavourList extends ChildsCoffeeFlavourLists {
// 	private isSecondaryFlavourPicked: boolean = false;
// 	private secondaryCoffeeFlavours: Observable<Array<CoffeeFlavour>>;
// 	public static checkedSecondaryCoffeeFlavours: Subject<
// 		Array<string>
// 	> = new Subject();
// 	private currentlyDisplayedElements: Array<HTMLInputElement>;

// 	private previousIdsDisplayed: Array<string> = new Array();
// 	private newIdsToDisplay: Array<string> = new Array();

// 	constructor(private _finalCoffeeFlavourList: any) {
// 		super(<HTMLDivElement>document.getElementById("second-type"));
// 		this.currentlyDisplayedElements = new Array();
// 		this.secondaryCoffeeFlavours = fetchSecondaryTypeFlavours();
// 	}

// 	protected configureObservable(): Observable<CoffeeFlavour> {
// 		return PrimaryCoffeeFlavourList.checkedPrimaryCoffeeFlavours.pipe(
// 			switchMap((ids: Array<string>) => {
// 				return this.secondaryCoffeeFlavours.pipe(
// 					concatAll(),
// 					filter((flavour: CoffeeFlavour) => {
// 						let flavourProfileSelected: boolean = false;
// 						ids.forEach((id: string) => {
// 							if (flavour.parrentFlavourId === id) {
// 								flavourProfileSelected = true;
// 							}
// 						});
// 						// this.previousIdsDisplayed.forEach((previousIdDisplayed: string) => {
// 						// 	if (previousIdDisplayed == flavour.id) {
// 						// 		this.newIdsToDisplay.push(flavour.id);
// 						// 	}
// 						// });
// 						return flavourProfileSelected;
// 					})
// 				);
// 			})
// 		);
// 	}

// 	protected subscribeToObservable(observable: Observable<CoffeeFlavour>): void {
// 		observable.subscribe((flavour: CoffeeFlavour) => {
// 			// const checkInputFlavour: HTMLInputElement = flavour.drawChechInputAsListItem(
// 			// 	this._list
// 			// );
// 			// //TODO implement checked input when changing parrent flavour
// 			// this.newIdsToDisplay.forEach((id: string) => {
// 			// 	if (flavour.id === id) {
// 			// 		checkInputFlavour.checked = true;
// 			// 		this._selectedIds.push(flavour.id);
// 			// 	}
// 			// });
// 			// checkInputFlavour.onclick = (event) => {
// 			// 	if (this.isSecondaryFlavourPicked) {
// 			// 		this._finalCoffeeFlavourList.clearList();
// 			// 	} else {
// 			// 		this.isSecondaryFlavourPicked = true;
// 			// 		this._finalCoffeeFlavourList.drawCoffeeList(
// 			// 			"What flavour profile would you like"
// 			// 		);
// 			// 	}
// 			// 	if (checkInputFlavour.checked) {
// 			// 		this._selectedIds.push(flavour.id);
// 			// 	} else {
// 			// 		this._selectedIds = this._selectedIds.filter(
// 			// 			(id: string) => id !== flavour.id
// 			// 		);
// 			// 	}
// 			// 	SecondaryCoffeeFlavourList.checkedSecondaryCoffeeFlavours.next(
// 			// 		this._selectedIds
// 			// 	);
// 			// };
// 			// this.deleteWrongCheckboxes();
// 		});
// 	}

// 	private deleteWrongCheckboxes(): void {}

// 	//TODO imagine this proccess
// 	public clearList(parrentIdsToDisplay: Array<string>): void {
// 		// this.previousIdsDisplayed = this._listItems.map((id: string) => id);
// 		// this._listItems.length = 0;
// 		// console.log(this._listItems);
// 		// this._finalCoffeeFlavourList.clearList();
// 	}
// }

// export default SecondaryCoffeeFlavourList;
