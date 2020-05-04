//rxjs
import { Observable } from "rxjs";
import { concatAll, switchMap, filter } from "rxjs/operators";
//flavours
import CoffeeFlavour from "../../models/coffee-flavour";
import FinalCoffeeFlavour from "../../models/final-coffee-flavour";
import CoffeeBeans from "../../models/coffee-bean";
//coffee flavour list
import ChildsCoffeeFlavourLists from "./abstract-classes/childs-coffee-flavour-list";
//databse access functions
import { fetchCoffeeBeans } from "../../services/fetch-from-databse";

class CoffeeBeansList extends ChildsCoffeeFlavourLists {
	private coffeeBeansFlavours: Observable<Array<CoffeeFlavour>>;
	constructor() {
		super(<HTMLDivElement>document.getElementById("coffee-beans"));
		this.coffeeBeansFlavours = fetchCoffeeBeans();
	}

	protected configureObservable(): Observable<CoffeeFlavour> {
		return FinalCoffeeFlavour.selectedFlavours.pipe(
			switchMap((id: string) => {
				return this.coffeeBeansFlavours.pipe(
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
