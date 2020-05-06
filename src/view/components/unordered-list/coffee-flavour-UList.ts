import { Observable, Subject } from "rxjs";
import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";
import CoffeeFlavour from "../../../models/coffee-flavour";
import { take, concatAll, map } from "rxjs/operators";
import {
	fetchFinalTypeFlavours,
	fetchPrimaryTypeFlavours,
} from "../../../services/fetch-from-databse";

abstract class CoffeeFlavourUList {
	private _list: HTMLUListElement;
	protected _flavoursId: Array<string>;
	private _isDisplayed: boolean;
	protected _selectedFlavoursIds: Subject<Array<string>>;
	//lako mogu da dobijem coffee flavour kao i checkbox

	constructor(private _host: HTMLDivElement) {
		this._list = this.createUList();
		this._flavoursId = new Array();
		this._isDisplayed = false;
		this._selectedFlavoursIds = new Subject();
	}

	private createUList(): HTMLUListElement {
		const listClassName = "list-group list-group-horizontal";
		const coffeeflavoursList: HTMLUListElement = document.createElement("ul");
		coffeeflavoursList.className = listClassName;
		return coffeeflavoursList;
	}

	public drawCoffeeList(description: string): void {
		if (this._host === null) return;

		this.drawDescription(description);
		this._host.appendChild(this._list);
		this._isDisplayed = true;

		this.subscribeToStream(
			this.configureObservable(fetchPrimaryTypeFlavours())
		);
	}

	private drawDescription(description: string): void {
		const descriptionToGuideUser: HTMLHeadingElement = document.createElement(
			"h5"
		);
		descriptionToGuideUser.innerText = description;
		this._host.appendChild(descriptionToGuideUser);
	}

	protected configureObservable(
		streamOfFlavours: Observable<Array<CoffeeFlavour>>
	): Observable<CoffeeFlavourListItem> {
		return streamOfFlavours.pipe(
			take(1),
			concatAll(),
			map(
				(flavour: CoffeeFlavour) =>
					new CoffeeFlavourListItem(this.uList, flavour)
			)
		);
	}

	protected subscribeToStream(
		configuredStream: Observable<CoffeeFlavourListItem>
	): void {
		configuredStream.subscribe((coffeeFlavourLItem: CoffeeFlavourListItem) => {
			coffeeFlavourLItem.drawListItem();
		});
	}

	protected abstract fetchObservableFromDb(): Observable<Array<CoffeeFlavour>>;

	protected get uList(): HTMLUListElement {
		return this._list;
	}

	protected get isDisplayed(): boolean {
		return this._isDisplayed;
	}

	protected removeIdFromList(id: string) {
		this._flavoursId = this._flavoursId.filter(
			(flavourId: string) => flavourId !== id
		);
	}
}

export default CoffeeFlavourUList;
