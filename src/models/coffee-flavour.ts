import { Subject } from "rxjs";

abstract class CoffeeFlavour {
	constructor(private _id: string, private _typeOfFlavour: string) {}

	drawListItem(ul: HTMLUListElement): HTMLButtonElement {
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
		button.innerText = this._typeOfFlavour;
		// button.onclick = () => {
		// 	this.pushToStream();
		// };
		wrapperDiv.appendChild(button);
		return button;
	}

	abstract addIdToSubject(): void;

	get id(): string {
		return this._id;
	}
}

export default CoffeeFlavour;
