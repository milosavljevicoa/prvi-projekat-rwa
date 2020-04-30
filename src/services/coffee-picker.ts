import { from } from "rxjs";
import { map } from "rxjs/operators";
import CoffeeFlavour from "../models/coffe-flavour";
// import CoffeeFlavour from "../models/coffe-flavour";

const DATA_BASE_URL: string = "http://localhost:3000/";

export function getFirstTypeOfCoffeeFlavour() {
	return from(
		fetch(DATA_BASE_URL + "firstCoffeeFlavour").then((data: Response) =>
			data.json()
		)
	).pipe(
		map((data) => {
			const retVal: Array<CoffeeFlavour> = data.map(
				(DTO: any) => new CoffeeFlavour(DTO["flavour"])
			);
			return retVal;
		})
	);
}
