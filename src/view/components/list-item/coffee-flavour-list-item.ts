import CoffeeFlavour from "../../../models/coffee-flavour";

class CoffeeFlavourListItem {
	private _checkBox!: HTMLInputElement;
	private _coffeeFlavour: CoffeeFlavour;

	constructor(private _ul: HTMLUListElement, coffeFlavour: CoffeeFlavour) {
		this._coffeeFlavour = coffeFlavour;
	}

	public drawListItem() {
		this.createListItem(this._ul);
	}

	private createCheckBox(): HTMLInputElement {
		const listItem: HTMLInputElement = document.createElement("input");
		listItem.type = "checkbox";
		listItem.className = "checkbox";
		listItem.value = this._coffeeFlavour.id;
		return listItem;
	}

	private createListItem(ul: HTMLUListElement): void {
		const classNameLi: string = "flavours";
		const listItem: HTMLLIElement = document.createElement("li");
		listItem.className = classNameLi;
		ul.appendChild(listItem);

		const classNameDiv: string = "coffee-flavour-div ";
		const wrapperDiv: HTMLDivElement = document.createElement("div");
		wrapperDiv.className = classNameDiv;
		listItem.appendChild(wrapperDiv);

		this._checkBox = this.createCheckBox();
		wrapperDiv.appendChild(this._checkBox);

		const flavour: HTMLParagraphElement = document.createElement("p");
		flavour.innerText = " - " + this._coffeeFlavour.typeOfFlavour;
		wrapperDiv.appendChild(flavour);
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
