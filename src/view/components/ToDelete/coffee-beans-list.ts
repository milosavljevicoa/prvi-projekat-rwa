// //rxjs
// import { Observable } from "rxjs";
// import { concatAll, switchMap, filter } from "rxjs/operators";
// //flavours
// import CoffeeFlavour from "../../../models/coffee-flavour";
// import FinalCoffeeFlavour from "../../../models/final-coffee-flavour";
// import CoffeeBeans from "../../../models/coffee-bean";
// //coffee flavour list
// import ChildsCoffeeFlavourLists from "./childs-coffee-flavour-list";
// //databse access functions
// import { fetchCoffeeBeans } from "../../../services/fetch-from-databse";
// import FinalCoffeeFlavourList from "./final-coffee-flavour-list";

// class CoffeeBeansList extends ChildsCoffeeFlavourLists {
// 	private coffeeBeansFlavours: Observable<Array<CoffeeFlavour>>;
// 	constructor() {
// 		super(<HTMLDivElement>document.getElementById("coffee-beans"));
// 		this.coffeeBeansFlavours = fetchCoffeeBeans();
// 	}

// 	protected configureObservable(): Observable<CoffeeFlavour> {
// 		return FinalCoffeeFlavourList.checkedFinalCoffeeFlavours.pipe(
// 			switchMap((ids: Array<string>) => {
// 				return this.coffeeBeansFlavours.pipe(
// 					concatAll(),
// 					filter((bean: CoffeeFlavour) => {
// 						let beanIds = bean.parrentFlavourId.split(",");
// 						let isRightTypeOfFlavour: boolean = true;
// 						beanIds.forEach((beanId: string) => {
// 							ids.forEach((parrentId: string) => {
// 								if (beanId != parrentId) {
// 									isRightTypeOfFlavour = false;
// 								}
// 							});
// 						});
// 						return isRightTypeOfFlavour;
// 					})
// 				);
// 			})
// 		);
// 		return this.coffeeBeansFlavours.pipe(concatAll()); //just so the function does not display error
// 	}

// 	protected subscribeToObservable(observable: Observable<CoffeeBeans>): void {
// 		observable.subscribe((coffeeBean: CoffeeBeans) => {
// 			// const checkInputFlavour: HTMLInputElement = coffeeBean.drawChechInputAsListItem(
// 			// 	this._list
// 			// );
// 			// checkInputFlavour.onclick = () => {
// 			// 	window.open(coffeeBean.urlToCoffeeBean);
// 			// };
// 		});
// 	}

// 	public clearList(): void {
// 		this._list.innerHTML = "";
// 	}
// }

// export default CoffeeBeansList;
