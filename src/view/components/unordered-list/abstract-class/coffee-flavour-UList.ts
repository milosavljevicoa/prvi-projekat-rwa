import { Observable, Subject } from "rxjs";
import CoffeeFlavourListItem from "../../list-item/coffee-flavour-list-item";

import {
	createH5withDescription,
	createEmptyCoffeeFlavourUList,
} from "../../../../services/create-elements-with-className";

abstract class CoffeeFlavourUList {
	private _list!: HTMLUListElement;
	private _selectedFlavoursIds$: Subject<Array<string>>;

	constructor(private _host: HTMLDivElement) {
		this._selectedFlavoursIds$ = new Subject();
	}

	public drawCoffeeList(description: string): void {
		if (this._host === null) return;
		const descriptionAboutLayer: HTMLHeadingElement = createH5withDescription(
			description
		);
		this._host.appendChild(descriptionAboutLayer);

		this._list = createEmptyCoffeeFlavourUList();
		this._host.appendChild(this._list);

		this.configureMySteam$().subscribe(this.displayFlavour);
	}

	protected abstract configureMySteam$(): Observable<CoffeeFlavourListItem>;

	private displayFlavour = (toDisplayListItem: CoffeeFlavourListItem) => {
		toDisplayListItem.drawListItem();
		toDisplayListItem.addButtonOnClick = this.onclick;
	};

	protected onclick = (event: Event): void => {
		let chosenButton: HTMLButtonElement = <HTMLButtonElement>event.target;
		let ids: Array<string> = chosenButton.value.split(",");
		this._selectedFlavoursIds$.next(ids);
	};

	protected get uList(): HTMLUListElement {
		return this._list;
	}

	public get selectedFlavoursIds(): Subject<Array<string>> {
		return this._selectedFlavoursIds$;
	}

	protected clearList(): void {
		this._list.innerHTML = "";
		this._selectedFlavoursIds$.next([]);
	}
}

export default CoffeeFlavourUList;
