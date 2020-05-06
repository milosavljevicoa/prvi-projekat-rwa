//coffee flavour list
// import Coffee

import { fetchPrimaryTypeFlavours } from "../services/fetch-from-databse";
import { concatAll, take, map } from "rxjs/operators";

import CoffeeFlavour from "../models/coffee-flavour";
import CoffeeFlavourUList from "./components/unordered-list/coffee-flavour-UList";
import CoffeeFlavourListItem from "./components/list-item/coffee-flavour-list-item";
import { Subject } from "rxjs";

//TODO sadrzace ul-ove i pomocu toga ce biti displayovan li
class CoffeePickerView {
	private _primaryCoffeeFlavourList!: CoffeeFlavourUList;
	private _selectedPrimaryFlavours!: Subject<Array<CoffeeFlavour>>;
	private _secondaryCoffeeFlavourList!: CoffeeFlavourUList;

	// private _finalCoffeeFlavourList: CoffeeFlavourUList;
	// private _coffeeBeansList: CoffeeFlavourUList;

	constructor() {
		const primaryDiv: HTMLDivElement | null = <HTMLDivElement>(
			document.getElementById("primary-type")
		);
		const secondaryDiv: HTMLDivElement | null = <HTMLDivElement>(
			document.getElementById("secondary-type")
		);

		if (primaryDiv === null || secondaryDiv === null) return;

		this._selectedPrimaryFlavours = new Subject();
		this._primaryCoffeeFlavourList = new CoffeeFlavourUList(primaryDiv);
		// this._secondaryCoffeeFlavourList = new CoffeeFlavourUList(secondaryDiv);
		this._primaryCoffeeFlavourList.drawCoffeeList("asd");

		// this.initPrimaryList();
	}

	// public initPrimaryList(): void {
	// 	this._primaryCoffeeFlavourList.configurationForObservable = () => {
	// 		return fetchPrimaryTypeFlavours().pipe(
	// 			take(1),
	// 			concatAll(),
	// 			map(
	// 				(primary: CoffeeFlavour) =>
	// 					new CoffeeFlavourListItem(
	// 						this._primaryCoffeeFlavourList.uList,
	// 						primary
	// 					)
	// 			)
	// 		);
	// 	};

	// 	this._primaryCoffeeFlavourList.subscribeToObservable = (
	// 		primaryCoffeeFlavour: CoffeeFlavourListItem
	// 	) => {
	// 		primaryCoffeeFlavour.drawListItem();
	// 		primaryCoffeeFlavour.addOnChangeForCheckBox = (event) => {
	// 			if (this._secondaryCoffeeFlavourList.isDisplayed) {
	// 				this._secondaryCoffeeFlavourList.clearList();
	// 			} else {
	// 				this._secondaryCoffeeFlavourList.drawCoffeeList(
	// 					"Pick coffee flavour profile"
	// 				);
	// 			}
	// 			this._primaryCoffeeFlavourList.pushIdToList(
	// 				primaryCoffeeFlavour.coffeeFlavour.id
	// 			);
	// 			// this._selectedPrimaryFlavours.next(this._primaryCoffeeFlavourList.)
	// 		};
	// 	};
	// 	this._primaryCoffeeFlavourList.drawCoffeeList("Pick a flavour");
	// }

	// public initSecondaryList(): void {
	// 	this._secondaryCoffeeFlavourList.configurationForObservable = () => {
	// 		return this._selectedPrimaryFlavours;
	// 	};
	// }

	public drawCompletedView(): void {
		// this._primaryCoffeeFlavourList.drawCoffeeList(
		// 	"Pick how would you like your coffee to taste"
		// );
	}
}

export default CoffeePickerView;
