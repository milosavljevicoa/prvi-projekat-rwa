export class CoffeeFlavour {
	constructor(private typeOfFlavour: string) {}

	drawListItem(ul: HTMLUListElement): void {
		const classNameLi: string = "list-group-item";
		const li: HTMLLIElement = document.createElement("li");
		li.className = classNameLi;
		ul.appendChild(li);

		const classNameDiv: string = "coffee-flavour-div";
		const wrapperDiv: HTMLDivElement = document.createElement("div");
		wrapperDiv.className = classNameDiv;
		li.appendChild(wrapperDiv);

		const input: HTMLInputElement = document.createElement("input");
		input.type = "checkbox";
		wrapperDiv.appendChild(input);

		const flavourType: HTMLParagraphElement = document.createElement("p");
		flavourType.innerText = this.typeOfFlavour;
		wrapperDiv.appendChild(flavourType);
	}
}

export default CoffeeFlavour;
