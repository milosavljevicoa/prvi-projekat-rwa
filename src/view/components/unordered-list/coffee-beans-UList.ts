import CoffeeBeans from "../../../models/coffee-beans";
import { Observable, Subject } from "rxjs";
import { fetchCoffeeBeans } from "../../../services/fetch-from-databse";
import {
	createEmptyCoffeeFlavourUList,
	createH5withDescription,
} from "../../../services/create-elements-with-className";
import CoffeeBeansListItem from "../list-item/coffee-bean-list-item";
import CoffeeFlavour from "../../../models/coffee-flavour";
import { switchMap, concatAll, filter, take, map } from "rxjs/operators";

class CoffeeBeansUList {
	private _list!: HTMLUListElement;
	private _host: HTMLDivElement;
	private _finalCoffeeFlavourStream: Subject<Array<string>>;
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
		streamOfFlavours: Observable<Array<CoffeeBeans>>
	): any {
		return this._finalCoffeeFlavourStream.pipe(
			switchMap((finalCoffeeFlavoursIds: Array<string>) => {
				this.clearList();
				return streamOfFlavours.pipe(
					take(1),
					concatAll(),
					filter((coffeeBeans: CoffeeBeans) => {
						if (finalCoffeeFlavoursIds.length === 0) return false;
						coffeeBeans.parrentFlavoursIds.forEach((parrentId: string) => {
							finalCoffeeFlavoursIds.forEach((finalCoffeeId: string) => {
								if (parrentId !== finalCoffeeId) return false;
							});
						});
						return true;
					}),
					map((bean: CoffeeBeans) => {
						return new CoffeeBeansListItem(this._list, bean);
					})
				);
			})
		);
	}

	private subscribeToStream(
		configuredStream: Observable<CoffeeBeansListItem>
	): void {
		configuredStream.subscribe((coffeeBeansLI: CoffeeBeansListItem) => {
			coffeeBeansLI.drawListItem();
		});
	}

	protected fetchObservableFromDb(): Observable<Array<CoffeeBeans>> {
		return fetchCoffeeBeans();
	}

	private clearList(): void {
		this._list.innerHTML = "";
	}
}

export default CoffeeBeansUList;
