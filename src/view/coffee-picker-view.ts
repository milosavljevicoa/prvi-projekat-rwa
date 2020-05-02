import PrimaryCoffeeFlavourList from "./components/primary-coffee-flavour-list";
import SecondaryCoffeeFlavourList from "./components/secondary-coffee-flavour-list";
import FinalCoffeeFlavour from "../models/final-coffee-flavour";
import FinalCoffeeFlavourList from "./components/final-coffee-flavour-list";
import CoffeeBeansList from "./components/coffee-beans-list";

class CoffeePickerView {
	private _primaryCoffeeFlavourList: PrimaryCoffeeFlavourList;

	constructor() {
		this._primaryCoffeeFlavourList = new PrimaryCoffeeFlavourList(
			new SecondaryCoffeeFlavourList(
				new FinalCoffeeFlavourList(new CoffeeBeansList())
			)
		);
	}

	public drawCompletedView(): void {
		this._primaryCoffeeFlavourList.drawCoffeeList(
			"Pick how would you like your coffee to taste"
		);
	}
}

export default CoffeePickerView;
