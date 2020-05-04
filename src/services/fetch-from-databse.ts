import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import CoffeeFlavour from "../models/coffee-flavour";
import PrimaryCoffeeFlavour from "../models/primary-coffee-flavour";
import SecondaryCoffeeFlavour from "../models/secondary-coffee-flavour";
import FinalCoffeeFlavour from "../models/final-coffee-flavour";
import CoffeeBeans from "../models/coffee-bean";

const DATA_BASE_URL: string = "http://localhost:3000/";

function getCoffeeFlavour(
	specificType: string
): Observable<Array<CoffeeFlavour>> {
	return from(
		fetch(DATA_BASE_URL + specificType).then((data: Response) => data.json())
	);
}

export function fetchPrimaryTypeFlavours(): Observable<Array<CoffeeFlavour>> {
	return getCoffeeFlavour("firstCoffeeFlavour").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => PrimaryCoffeeFlavour.createCoffeeFlavour(DTO))
		)
	);
}

export function fetchSecondaryTypeFlavours(): Observable<Array<CoffeeFlavour>> {
	return getCoffeeFlavour("secondCoffeeFlavour").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => SecondaryCoffeeFlavour.createCoffeeFlavour(DTO))
		)
	);
}

export function fetchFinalTypeFlavours(): Observable<Array<CoffeeFlavour>> {
	return getCoffeeFlavour("finalFlavourProfile").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => FinalCoffeeFlavour.createCoffeeFlavour(DTO))
		)
	);
}

export function fetchCoffeeBeans(): Observable<Array<CoffeeFlavour>> {
	return getCoffeeFlavour("coffeeBeans").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => CoffeeBeans.createCoffeeBeans(DTO))
		)
	);
}
