abstract class CoffeeFlavour {
	constructor(private _id: string, protected _typeOfFlavour: string) {}

	drawChechInputAsListItem(ul: HTMLUListElement): HTMLInputElement {
		const classNameLi: string = "flavours ";
		const li: HTMLLIElement = document.createElement("li");
		li.className = classNameLi + this.parrentFlavourId;
		ul.appendChild(li);

		const classNameDiv: string = "coffee-flavour-div ";
		const wrapperDiv: HTMLDivElement = document.createElement("div");
		wrapperDiv.className = classNameDiv;
		li.appendChild(wrapperDiv);
		const checkBox: HTMLInputElement = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.className = "checkbox";
		checkBox.value = this._id;
		const flavour: HTMLParagraphElement = document.createElement("p");
		flavour.innerText = " - " + this.flavourDescriptionInButton();
		wrapperDiv.appendChild(checkBox);
		wrapperDiv.appendChild(flavour);
		return checkBox;
	}

	private flavourDescriptionInButton(): string {
		return this._typeOfFlavour;
	}

	abstract get parrentFlavourId(): string;

	get id(): string {
		return this._id;
	}
}

export default CoffeeFlavour;
