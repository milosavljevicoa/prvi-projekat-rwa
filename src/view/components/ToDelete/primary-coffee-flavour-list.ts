// //rxjs
// import { Observable, Subject } from "rxjs";
// import { take, concatAll, map } from "rxjs/operators";
// //flavours
// import CoffeeFlavour from "../../../models/coffee-flavour";
// //coffee flavour list
// import CoffeeFlavourUList from "./coffee-flavour-UList";
// import SecondaryCoffeeFlavourList from "./secondary-coffee-flavour-list";
// //database access functions
// import { fetchPrimaryTypeFlavours } from "../../../services/fetch-from-databse";
// import CoffeeBeans from "../../../models/coffee-bean";
// import PrimaryCoffeeFlavour from "../../../models/primary-coffee-flavour";
// import CoffeeFlavourListItem from "../list-item/coffee-flavour-list-item";

// class PrimaryCoffeeFlavourList extends CoffeeFlavourUList {
// 	protected configureObservable(): Observable<CoffeeFlavourListItem> {
// 		return fetchPrimaryTypeFlavours().pipe(
// 			take(1),
// 			concatAll(),
// 			map((flavour: CoffeeFlavour) => {
// 				return new CoffeeFlavourListItem(this._list, flavour);
// 			})
// 		);
// 	}

// 	protected subscribeToObservable(
// 		observable: Observable<CoffeeFlavourListItem>
// 	): void {}
// }

// export default PrimaryCoffeeFlavourList;
