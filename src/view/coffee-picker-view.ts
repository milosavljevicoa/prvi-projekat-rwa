import CoffeeFlavourUList from "./components/unordered-list/abstract-class/coffee-flavour-UList";
import PrimaryCoffeeUList from "./components/unordered-list/primary-coffee-UList";
import SecondaryCoffeeUList from "./components/unordered-list/secondary-coffee-UList";
import FinalCoffeeFlavourUList from "./components/unordered-list/final-coffee-flavour-UList";
import CoffeeBeanUList from "./components/unordered-list/coffee-bean-UList";
import CoffeeBeansHistoryUList from "./components/unordered-list/coffee-beans-history-UList";

class CoffeePickerView {
	private _primaryCoffeeFlavourList!: CoffeeFlavourUList;
	private _secondaryCoffeeFlavourList!: CoffeeFlavourUList;
	private _finalCoffeeFlavourList: CoffeeFlavourUList;
	private _coffeeBeanList: CoffeeFlavourUList;
	private _coffeeHistoryList: CoffeeBeansHistoryUList;

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

		this._coffeeHistoryList = new CoffeeBeansHistoryUList(
			this._coffeeBeanList.selectedFlavoursIds
		);
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
		this._coffeeBeanList.drawCoffeeList("Your Coffee Beans");

		this._coffeeHistoryList.drawHistoryList();
	}
}

export default CoffeePickerView;
