abstract class CoffeeFlavour {
	constructor(private _id: string, protected _typeOfFlavour: string) {}

	drawButtonAsListItem(ul: HTMLUListElement): HTMLButtonElement {
		const classNameLi: string = "flavours";
		const li: HTMLLIElement = document.createElement("li");
		li.className = classNameLi;
		ul.appendChild(li);

		const classNameDiv: string = "coffee-flavour-div";
		const wrapperDiv: HTMLDivElement = document.createElement("div");
		wrapperDiv.className = classNameDiv;
		li.appendChild(wrapperDiv);
		const button: HTMLButtonElement = document.createElement("button");
		button.className = "btn btn-dark";
		button.innerText = this.flavourDescriptionInButton();
		wrapperDiv.appendChild(button);
		return button;
	}

	private flavourDescriptionInButton(): string {
		return this._typeOfFlavour;
	}

	abstract addIdToSubject(): void;

	abstract get parrentFlavourId(): string;

	get id(): string {
		return this._id;
	}
}

export default CoffeeFlavour;
