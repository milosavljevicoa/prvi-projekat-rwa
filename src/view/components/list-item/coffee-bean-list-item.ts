import {
	createListItem,
	createButtonWithInnerText,
} from "../../../services/create-elements-with-className";
import CoffeeBeans from "../../../models/coffee-beans";

class CoffeeBeansListItem {
	private _coffeeFlavourButton!: HTMLButtonElement;
	private _coffeeBeans: CoffeeBeans;

	constructor(private _ul: HTMLUListElement, coffeFlavour: CoffeeBeans) {
		this._coffeeBeans = coffeFlavour;
	}

	public drawListItem() {
		let listItem = createListItem();
		this._ul.appendChild(listItem);

		this._coffeeFlavourButton = createButtonWithInnerText(
			this._coffeeBeans.typeOfCoffeeBean
		);
		this.addOnClickButton();

		listItem.appendChild(this._coffeeFlavourButton);
	}

	private addOnClickButton() {
		this._coffeeFlavourButton.onclick = () => {
			window.open(this._coffeeBeans.urlToCoffeeBean);
		};
	}
}

export default CoffeeBeansListItem;
