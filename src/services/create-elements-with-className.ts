import CoffeeLinkListItem from "../view/components/list-item/coffee-link-list-item";
import { Observable, empty, of } from "rxjs";

export function createEmptyCoffeeFlavourUList(): HTMLUListElement {
	const listClassName = "list-flavours";
	const coffeeflavoursList: HTMLUListElement = document.createElement("ul");
	coffeeflavoursList.className = listClassName;
	return coffeeflavoursList;
}

export function createH5withDescription(
	description: string
): HTMLHeadingElement {
	const descriptionToGuideUser: HTMLHeadingElement = document.createElement(
		"h5"
	);
	descriptionToGuideUser.innerText = description;
	return descriptionToGuideUser;
}

export function createListItem(): HTMLLIElement {
	const classNameLi: string = "flavours";
	const listItem: HTMLLIElement = document.createElement("li");
	listItem.className = classNameLi;

	return listItem;
}

export function createWrapperWithDescription(
	descriptionForParagraph: string
): HTMLDivElement {
	const classNameDiv: string = "coffee-flavour-div ";
	const wrapper: HTMLDivElement = document.createElement("div");
	wrapper.className = classNameDiv;

	const classNameParagraph: string = "flavour-description";
	const flavour: HTMLParagraphElement = document.createElement("p");
	flavour.className = classNameParagraph;
	flavour.innerText = " - " + descriptionForParagraph;
	wrapper.appendChild(flavour);

	return wrapper;
}

export function createCheckBoxWithValue(value: string): HTMLInputElement {
	const checkBox: HTMLInputElement = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.className = "checkbox";
	checkBox.value = value;
	return checkBox;
}

export function createButtonWithInnerText(
	innerText: string
): HTMLButtonElement {
	const btn: HTMLButtonElement = document.createElement("button");
	btn.innerText = innerText;
	btn.className = "btn btn-dark text-center d-block w-100";
	return btn;
}

export function createAnchorWithLink(
	coffeeBeanAndLink: Array<string>
): HTMLAnchorElement {
	const coffeeBean: string = coffeeBeanAndLink[0];
	const linkToCoffee: string = coffeeBeanAndLink[1];
	const anchor: HTMLAnchorElement = document.createElement("a");
	anchor.className = "text-primary";
	anchor.href = linkToCoffee;
	anchor.innerText = coffeeBean;
	anchor.target = "_blank";

	return anchor;
}

export function createHistoryCoffeeLinkListItem$(
	coffeeBeanWithLinkToNewPage: Array<string>,
	ul: HTMLUListElement
): Observable<CoffeeLinkListItem> {
	if (coffeeBeanWithLinkToNewPage.length === 0) {
		return empty();
	}
	const listItem: CoffeeLinkListItem = new CoffeeLinkListItem(
		ul,
		coffeeBeanWithLinkToNewPage
	);
	return of(listItem);
}
