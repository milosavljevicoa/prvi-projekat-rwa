import CoffeeFlavour from "../../../models/coffee-flavour";

import {
	createListItem,
	createWrapperWithDescription,
	createCheckBoxWithValue,
} from "../../../services/create-elements-with-className";

class CoffeeFlavourListItem {
	private _checkBox!: HTMLInputElement;
	private _coffeeFlavour: CoffeeFlavour;

	constructor(private _ul: HTMLUListElement, coffeFlavour: CoffeeFlavour) {
		this._coffeeFlavour = coffeFlavour;
	}

	public drawListItem() {
		let listItem = createListItem();
		this._ul.appendChild(listItem);

		const wrapperWithDesciprtion: HTMLDivElement = createWrapperWithDescription(
			this.coffeeFlavour.typeOfFlavour
		);

		this._checkBox = createCheckBoxWithValue(this._coffeeFlavour.id);

		wrapperWithDesciprtion.appendChild(this._checkBox);

		listItem.appendChild(wrapperWithDesciprtion);
	}

	public set addOnChangeForCheckBox(action: (event?: Event) => void) {
		this._checkBox.onchange = action;
	}

	get checkBox(): HTMLInputElement {
		return this._checkBox;
	}

	get coffeeFlavour(): CoffeeFlavour {
		return this._coffeeFlavour;
	}
}

export default CoffeeFlavourListItem;
