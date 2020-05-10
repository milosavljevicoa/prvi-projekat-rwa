import {
	createAnchorWithLink,
	createListItem,
} from "../../../services/create-elements-with-className";

class CoffeeLinkListItem {
	private _listItem!: HTMLLIElement;
	private _coffeeLink!: HTMLAnchorElement;

	constructor(
		private _ul: HTMLUListElement,
		coffeeBeanAndLinkToNewPage: Array<string>
	) {
		this._coffeeLink = createAnchorWithLink(coffeeBeanAndLinkToNewPage);
	}

	public drawListItem() {
		this._listItem = createListItem();
		this._listItem.className = "list-group-item";
		this._listItem.appendChild(this._coffeeLink);
		this._ul.append(this._listItem);
	}
}

export default CoffeeLinkListItem;
