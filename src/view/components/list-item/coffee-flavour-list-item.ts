import CoffeeFlavour from "../../../models/coffee-flavour";

import {
	createListItem,
	createButtonWithInnerText,
} from "../../../services/create-elements-with-className";

class CoffeeFlavourListItem {
	private _button: HTMLButtonElement;
	private _coffeeFlavour: CoffeeFlavour;

	constructor(private _ul: HTMLUListElement, coffeFlavour: CoffeeFlavour) {
		this._coffeeFlavour = coffeFlavour;
		this._button = createButtonWithInnerText(this._coffeeFlavour.typeOfFlavour);
	}

	public drawListItem() {
		let listItem = createListItem();
		this._ul.appendChild(listItem);

		this._button.value = this._coffeeFlavour.valueForButton;

		listItem.appendChild(this._button);
	}

	public set addButtonOnClick(action: (event: Event) => void) {
		this._button.onclick = action;
	}
}

export default CoffeeFlavourListItem;
