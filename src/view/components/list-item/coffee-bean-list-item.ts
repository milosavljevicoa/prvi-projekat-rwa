import {
	createListItem,
	createButtonWithInnerText,
} from "../../../services/create-elements-with-className";
import CoffeeBean from "../../../models/coffee-bean";

class CoffeeBeanListItem {
	private _coffeeFlavourButton!: HTMLButtonElement;
	private _coffeeBean: CoffeeBean;

	constructor(private _ul: HTMLUListElement, coffeFlavour: CoffeeBean) {
		this._coffeeBean = coffeFlavour;
	}

	public drawListItem() {
		let listItem = createListItem();
		this._ul.appendChild(listItem);

		this._coffeeFlavourButton = createButtonWithInnerText(
			this._coffeeBean.typeOfCoffeeBean
		);
		this.addOnClickButton();

		listItem.appendChild(this._coffeeFlavourButton);
	}

	private addOnClickButton() {
		this._coffeeFlavourButton.onclick = () => {
			window.open(this._coffeeBean.urlToCoffeeBean);
		};
	}
}

export default CoffeeBeanListItem;
