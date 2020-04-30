export {};
import CoffeeFlavour from "../models/coffe-flavour";

export function drawCoffeeFlavourList(host: HTMLDivElement): void {
	const description: string = "Pick how would you like your coffee to taste";
	const test: Array<CoffeeFlavour> = new Array<CoffeeFlavour>();
	test.push(new CoffeeFlavour("chocolate"));
	test.push(new CoffeeFlavour("mexican"));

	const descriptionToGuideUser: HTMLHeadingElement = document.createElement(
		"h5"
	);
	descriptionToGuideUser.innerText = description;
	host.appendChild(descriptionToGuideUser);

	const listClassName = "list-group list-group-horizontal";
	const coffeeflavoursList: HTMLUListElement = document.createElement("ul");
	coffeeflavoursList.className = listClassName;
	host.appendChild(coffeeflavoursList);

	test.forEach((cf) => {
		cf.drawListItem(coffeeflavoursList);
	});
}
