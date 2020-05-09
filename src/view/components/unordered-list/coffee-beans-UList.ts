import CoffeeBean from "../../../models/coffee-bean";
import { Observable, Subject } from "rxjs";
import { fetchCoffeeBean } from "../../../services/fetch-from-databse";
import {
	createEmptyCoffeeFlavourUList,
	createH5withDescription,
} from "../../../services/create-elements-with-className";
import CoffeeBeanListItem from "../list-item/coffee-bean-list-item";
import { switchMap, concatAll, filter, take, map } from "rxjs/operators";

class CoffeeBeanUList {
	private _list!: HTMLUListElement;
	private _host: HTMLDivElement;
	private _finalCoffeeFlavourStream: Subject<Array<string>>;
	private _displayNotFoundCoffeeBean!: boolean;
	constructor(finalCoffeeFlavourStream: Subject<Array<string>>) {
		this._host = <HTMLDivElement>document.getElementById("coffee-beans");
		this._finalCoffeeFlavourStream = finalCoffeeFlavourStream;
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

	protected configureObservable(
		streamOfFlavours: Observable<Array<CoffeeBean>>
	): any {
		return this._finalCoffeeFlavourStream.pipe(
			switchMap((finalCoffeeFlavoursIds: Array<string>) => {
				this.clearList();
				return streamOfFlavours.pipe(
					take(1),
					concatAll(),
					filter((coffeeBean: CoffeeBean) => {
						if (finalCoffeeFlavoursIds.length === 0) {
							this._displayNotFoundCoffeeBean = false;
							return false;
						}
						const foundCoffeeBeanToDisplay: boolean = finalCoffeeFlavoursIds.every(
							(coffeeFlavourId: string) =>
								coffeeBean.parrentFlavoursIds.includes(coffeeFlavourId)
						);
						this._displayNotFoundCoffeeBean = !foundCoffeeBeanToDisplay;
						return foundCoffeeBeanToDisplay;
					}),
					map((bean: CoffeeBean) => {
						this._displayNotFoundCoffeeBean = false;
						return new CoffeeBeanListItem(this._list, bean);
					})
				);
			})
		);
	}

	private subscribeToStream(
		configuredStream: Observable<CoffeeBeanListItem>
	): void {
		configuredStream.subscribe((coffeeBeanLI: CoffeeBeanListItem) => {
			coffeeBeanLI.drawListItem();
		});
	}

	protected fetchObservableFromDb(): Observable<Array<CoffeeBean>> {
		return fetchCoffeeBean();
	}

	private clearList(): void {
		this._list.innerHTML = "";
	}
}

export default CoffeeBeanUList;
