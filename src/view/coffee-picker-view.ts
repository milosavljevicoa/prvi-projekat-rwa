import CoffeeFlavour from "../models/coffee-flavour";
import { Observable, Subject } from "rxjs";
import { switchMap, filter, concatAll, take } from "rxjs/operators";
import { fetchSecondTypeFlavours } from "../services/coffee-picker";
import SecoundCoffeeFlavour from "../models/secound-coffee-flavour";

class CoffeePickerView {
	private isFirstFlavourPicked: boolean = false;
	private firstCoffeeFlavourList: HTMLUListElement;
	private secoundCoffeeFlavourList: HTMLUListElement;

	constructor() {
		this.firstCoffeeFlavourList = this.createUnorderListWithStyles();
		this.secoundCoffeeFlavourList = this.createUnorderListWithStyles();
	}

	private createUnorderListWithStyles(): HTMLUListElement {
		const listClassName = "list-group list-group-horizontal";
		const coffeeflavoursList: HTMLUListElement = document.createElement("ul");
		coffeeflavoursList.className = listClassName;
		return coffeeflavoursList;
	}

	private createDescriptionForUL(
		hostForUl: HTMLDivElement,
		description: string
	): void {
		const descriptionToGuideUser: HTMLHeadingElement = document.createElement(
			"h5"
		);
		descriptionToGuideUser.innerText = description;
		hostForUl.appendChild(descriptionToGuideUser);
	}

	drawFirstCoffeeFlavours(
		host: HTMLDivElement,
		observable: Observable<Array<CoffeeFlavour>>
	): void {
		const description: string = "Pick how would you like your coffee to taste";
		this.createDescriptionForUL(host, description);
		host.append(this.firstCoffeeFlavourList);
		observable
			.pipe(take(1), concatAll())
			.subscribe((flavour: CoffeeFlavour) => {
				const buttonFlavour: HTMLButtonElement = flavour.drawListItem(
					this.firstCoffeeFlavourList
				);
				buttonFlavour.onclick = () => {
					if (this.isFirstFlavourPicked)
						this.secoundCoffeeFlavourList.innerHTML = "";
					else {
						this.isFirstFlavourPicked = true;
					}
					flavour.addIdToSubject();
				};
			});
	}

	drawSecoundCoffeeFlavours(host: HTMLDivElement, stream: Subject<string>) {
		const description: string = "Now pick with a bit more detail";
		this.createDescriptionForUL(host, description);
		host.appendChild(this.secoundCoffeeFlavourList);
		stream
			.pipe(
				switchMap((id: string) => {
					return fetchSecondTypeFlavours().pipe(
						concatAll(),
						filter(
							(flavour: SecoundCoffeeFlavour) => flavour.parrentFlavourId === id
						)
					);
				})
			)
			.subscribe((flavour: CoffeeFlavour) => {
				flavour.drawListItem(this.secoundCoffeeFlavourList);
				//add functionality for button
			});
	}
}

export default CoffeePickerView;

// function createUnorderedListWithDesciption(
// 	host: HTMLDivElement,
// 	description: string
// ): HTMLUListElement {
// 	const descriptionToGuideUser: HTMLHeadingElement = document.createElement(
// 		"h5"
// 	);
// 	descriptionToGuideUser.innerText = description;
// 	host.appendChild(descriptionToGuideUser);

// 	const listClassName = "list-group list-group-horizontal";
// 	const coffeeflavoursList: HTMLUListElement = document.createElement("ul");
// 	coffeeflavoursList.className = listClassName;
// 	host.appendChild(coffeeflavoursList);

// 	return coffeeflavoursList;
// }

// export function drawFirstCoffeeFlavours(
// 	host: HTMLDivElement,
// 	stream: Observable<Array<CoffeeFlavour>>
// ): void {
// 	const description: string = "Pick how would you like your coffee to taste";
// 	const coffeeflavoursList: HTMLUListElement = createUnorderedListWithDesciption(
// 		host,
// 		description
// 	);

// 	stream.subscribe((flavours: Array<CoffeeFlavour>) => {
// 		flavours.forEach((flavour: CoffeeFlavour) =>
// 			flavour.drawListItem(coffeeflavoursList)
// 		);
// 	});
// }

// export function drawCoffeeFlavours(
// 	host: HTMLDivElement,
// 	stream: Subject<string>
// ) {
// 	const description: string = "Now pick with a bit more detail";
// 	const coffeeflavoursList: HTMLUListElement = createUnorderedListWithDesciption(
// 		host,
// 		description
// 	);
// 	stream
// 		.pipe(
// 			switchMap((id: string) => {
// 				return fetchSecondTypeFlavours().pipe(
// 					concatAll(),
// 					filter(
// 						(flavour: SecoundCoffeeFlavour) => flavour.parrentFlavourId === id
// 					)
// 				);
// 			})
// 		)
// 		.subscribe((flavour: SecoundCoffeeFlavour) => {
// 			flavour.drawListItem(coffeeflavoursList);
// 		});
// }
