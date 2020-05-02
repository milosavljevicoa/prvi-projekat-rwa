import { Observable, Subject } from "rxjs";
import CoffeeFlavour from "../../models/coffee-flavour";

abstract class CoffeeFlavourList {
	protected _list: HTMLUListElement;
	constructor(private _host: HTMLDivElement) {
		this._list = this.createUnorderListWithStyles();
	}

	private createUnorderListWithStyles(): HTMLUListElement {
		const listClassName = "list-group list-group-horizontal";
		const coffeeflavoursList: HTMLUListElement = document.createElement("ul");
		coffeeflavoursList.className = listClassName;
		return coffeeflavoursList;
	}

	public drawCoffeeList(description: string): void {
		if (this._host === null) return;
		this.drawDescription(description);
		this._host.appendChild(this._list);
		let configuredObservable: Observable<CoffeeFlavour> = this.configureObservable();
		this.subscribeToObservable(configuredObservable);
	}

	protected drawDescription(description: string): void {
		const descriptionToGuideUser: HTMLHeadingElement = document.createElement(
			"h5"
		);
		descriptionToGuideUser.innerText = description;
		this._host.appendChild(descriptionToGuideUser);
	}

	protected abstract configureObservable(): Observable<CoffeeFlavour>;

	protected abstract subscribeToObservable(
		observable: Observable<CoffeeFlavour>
	): void;

	public abstract clearList(): void;
}

export default CoffeeFlavourList;
