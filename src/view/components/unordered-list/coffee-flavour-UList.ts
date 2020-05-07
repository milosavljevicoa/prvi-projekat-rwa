import { Observable, Subject } from "rxjs";
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
import CoffeeFlavour from "../../../models/coffee-flavour";

import {
	createH5withDescription,
	createEmptyCoffeeFlavourUList,
} from "../../../services/create-elements-with-className";

abstract class CoffeeFlavourUList {
	private _list!: HTMLUListElement;
	protected _coffeeFlavourListItems: Array<CoffeeFlavourListItem>;
	protected _selectedFlavoursIds: Subject<Array<string>>;

	constructor(private _host: HTMLDivElement) {
		this._coffeeFlavourListItems = new Array();
		this._selectedFlavoursIds = new Subject();
	}

	public drawCoffeeList(description: string): void {
		if (this._host === null) return;
		const descriptionToGuideUser: HTMLHeadingElement = createH5withDescription(
			description
		);
		this._host.appendChild(descriptionToGuideUser);

		this._list = createEmptyCoffeeFlavourUList();
		this._host.appendChild(this._list);

		this.subscribeToStream(
			this.configureObservable(this.fetchObservableFromDb())
		);
	}

	protected abstract configureObservable(
		streamOfFlavours: Observable<Array<CoffeeFlavour>>
	): Observable<CoffeeFlavourListItem>;

	private subscribeToStream(
		configuredStream: Observable<CoffeeFlavourListItem>
	): void {
		configuredStream.subscribe((coffeeFlavourLItem: CoffeeFlavourListItem) => {
			coffeeFlavourLItem.drawListItem();
			this._coffeeFlavourListItems.push(coffeeFlavourLItem);
			coffeeFlavourLItem.addOnChangeForCheckBox = this.handleOnClickCheckBox;
		});
	}

	protected abstract handleOnClickCheckBox = (listItem?: Event): void => {};

	protected abstract fetchObservableFromDb(): Observable<Array<CoffeeFlavour>>;

	protected get uList(): HTMLUListElement {
		return this._list;
	}

	public get selectedFlavoursIds(): Subject<Array<string>> {
		return this._selectedFlavoursIds;
	}

	protected clearList(): void {
		this._list.innerHTML = "";
		this._coffeeFlavourListItems.length = 0;
		this._selectedFlavoursIds.next([]);
	}
}

export default CoffeeFlavourUList;
