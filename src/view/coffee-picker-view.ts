//coffee flavour list
import PrimaryCoffeeFlavourList from "./components/primary-coffee-flavour-list";
import SecondaryCoffeeFlavourList from "./components/secondary-coffee-flavour-list";
import FinalCoffeeFlavourList from "./components/final-coffee-flavour-list";
import CoffeeBeansList from "./components/coffee-beans-list";

class CoffeePickerView {
	private _primaryCoffeeFlavourList: PrimaryCoffeeFlavourList;

	constructor() {
		const coffeeBeansList = new CoffeeBeansList();

		const finalCoffeeFlavourList = new FinalCoffeeFlavourList(coffeeBeansList);

		const secondaryCoffeeFlavourList = new SecondaryCoffeeFlavourList(
			finalCoffeeFlavourList
		);

		this._primaryCoffeeFlavourList = new PrimaryCoffeeFlavourList(
			secondaryCoffeeFlavourList
		);
	}

	public drawCompletedView(): void {
		this._primaryCoffeeFlavourList.drawCoffeeList(
			"Pick how would you like your coffee to taste"
		);
	}
}

export default CoffeePickerView;
