import CoffeeFlavourUList from "./coffee-flavour-UList";
import { fetchPrimaryTypeFlavours } from "../../../services/fetch-from-databse";
import { Observable } from "rxjs";
import CoffeeFlavour from "../../../models/coffee-flavour";

class PrimaryCoffeeUList extends CoffeeFlavourUList {
	protected fetchObservableFromDb(): Observable<Array<CoffeeFlavour>> {
		return fetchPrimaryTypeFlavours();
	}
}
