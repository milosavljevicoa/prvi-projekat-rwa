import CoffeeFlavourList from "./coffee-flavour-list";
import { Observable, concat } from "rxjs";
import CoffeeFlavour from "../../models/coffee-flavour";
import FinalCoffeeFlavour from "../../models/final-coffee-flavour";
import {
	fetchFinalTypeFlavours,
	fetchCoffeeBeans,
} from "../../services/fetch-from-databse";
import { concatAll, take, switchMap, filter } from "rxjs/operators";
import CoffeeBeans from "../../models/coffee-bean";

class CoffeeBeansList extends CoffeeFlavourList {
	constructor() {
		super(<HTMLDivElement>document.getElementById("coffee-beans"));
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return FinalCoffeeFlavour.myStream.pipe(
			switchMap((id: string) => {
				return fetchCoffeeBeans().pipe(
					concatAll(),
					filter((bean: CoffeeFlavour) => {
						let beanIds = bean.parrentFlavourId.split(",");
						let isRightTypeOfFlavour: boolean = false;
						beanIds.forEach((beanId: string) => {
							if (beanId === id) isRightTypeOfFlavour = true;
						});
						return isRightTypeOfFlavour;
					})
				);
			})
		);
	}

	protected subscribeToObservable(observable: Observable<CoffeeBeans>): void {
		observable.subscribe((coffeeBean: CoffeeBeans) => {
			const coffeeBeanBtn: HTMLButtonElement = coffeeBean.drawButtonAsListItem(
				this._list
			);
			coffeeBeanBtn.onclick = () => {
				window.open(coffeeBean.urlToCoffeeBean);
			};
		});
	}

	public clearList(): void {
		this._list.innerHTML = "";
	}
}

export default CoffeeBeansList;
