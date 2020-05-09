//coffee flavour list
// import Coffee

import { fetchPrimaryTypeFlavours } from "../services/fetch-from-databse";
import { concatAll, take, map } from "rxjs/operators";

import CoffeeFlavour from "../models/coffee-flavour";
import CoffeeFlavourUList from "./components/unordered-list/coffee-flavour-UList";
import CoffeeFlavourListItem from "./components/list-item/coffee-flavour-list-item";
import { Subject } from "rxjs";
import PrimaryCoffeeUList from "./components/unordered-list/primary-coffee-UList";
import SecondaryCoffeeUList from "./components/unordered-list/secondary-coffee-UList";
import FinalCoffeeFlavourUList from "./components/unordered-list/final-coffee-flavour-UList";
import CoffeeBeanUList from "./components/unordered-list/coffee-beans-UList";

class CoffeePickerView {
	private _primaryCoffeeFlavourList!: CoffeeFlavourUList;
	private _secondaryCoffeeFlavourList!: CoffeeFlavourUList;
	private _finalCoffeeFlavourList: CoffeeFlavourUList;
	private _coffeeBeanList: CoffeeBeanUList;

	constructor() {
		this._primaryCoffeeFlavourList = new PrimaryCoffeeUList();
		this._secondaryCoffeeFlavourList = new SecondaryCoffeeUList(
			this._primaryCoffeeFlavourList.selectedFlavoursIds
		);
		this._finalCoffeeFlavourList = new FinalCoffeeFlavourUList(
			this._secondaryCoffeeFlavourList.selectedFlavoursIds
		);

		this._coffeeBeanList = new CoffeeBeanUList(
			this._finalCoffeeFlavourList.selectedFlavoursIds
		);
		// this.initPrimaryList();
	}

	public drawCompletedView(): void {
		this._primaryCoffeeFlavourList.drawCoffeeList(
			"First Layer To Pick a Coffee Flavour"
		);
		this._secondaryCoffeeFlavourList.drawCoffeeList(
			"Second Layer To Pick a Coffee Flavour"
		);
		this._finalCoffeeFlavourList.drawCoffeeList(
			"Third Layer To Pick a Coffee Flavour"
		);
		this._coffeeBeanList.drawCoffeeList("Link To Your Coffee Beans");
	}
}

export default CoffeePickerView;
