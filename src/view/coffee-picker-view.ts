//coffee flavour list
import PrimaryCoffeeFlavourList from "./components/primary-coffee-flavour-list";
import SecondaryCoffeeFlavourList from "./components/secondary-coffee-flavour-list";
import FinalCoffeeFlavourList from "./components/final-coffee-flavour-list";
import CoffeeBeansList from "./components/coffee-beans-list";

class CoffeePickerView {
	private _primaryCoffeeFlavourList: PrimaryCoffeeFlavourList;
	private _secondaryCoffeeFlavourList: SecondaryCoffeeFlavourList;
	private _finalCoffeeFlavourList: FinalCoffeeFlavourList;
	private _coffeeBeansList: CoffeeBeansList;

	constructor() {
		this._coffeeBeansList = new CoffeeBeansList();

		this._finalCoffeeFlavourList = new FinalCoffeeFlavourList(
			this._coffeeBeansList
		);

		this._secondaryCoffeeFlavourList = new SecondaryCoffeeFlavourList(
			this._finalCoffeeFlavourList
		);

		this._primaryCoffeeFlavourList = new PrimaryCoffeeFlavourList(
			this._secondaryCoffeeFlavourList
		);
	}

	public drawCompletedView(): void {
		this._primaryCoffeeFlavourList.drawCoffeeList(
			"Pick how would you like your coffee to taste"
		);
	}
}

export default CoffeePickerView;
