import { from, Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import CoffeeFlavour from "../models/coffee-flavour";
import FirstCoffeeFlavour from "../models/first-coffee-flavour";
import SecoundCoffeeFlavour from "../models/secound-coffee-flavour";
import FinalCoffeeFlavour from "../models/final-coffee-flavour";

const DATA_BASE_URL: string = "http://localhost:3000/";

// let firstTypeOfCoffeeFlavourStream: Observable<FirstCoffeeFlavour>;
// let secondTypeOfCoffeeFlavourStream: Observable<SecoundCoffeeFlavour>;
// let finalTypeOfCoffeeFlavourStream: Observable<FinalCoffeeFlavour>;

function getSpecificTypeOfCoffeeFlavour(
	specificType: string
): Observable<Array<CoffeeFlavour>> {
	return from(
		fetch(DATA_BASE_URL + specificType).then((data: Response) => data.json())
	).pipe(
		take(1)
		// , concatAll()
	);
}

export function fetchFirstTypeFlavours(): Observable<
	Array<FirstCoffeeFlavour>
> {
	return getSpecificTypeOfCoffeeFlavour("firstCoffeeFlavour").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => FirstCoffeeFlavour.createCoffeeFlavour(DTO))
		)
	);
}

export function fetchSecondTypeFlavours(): Observable<
	Array<SecoundCoffeeFlavour>
> {
	return getSpecificTypeOfCoffeeFlavour("secondCoffeeFlavour").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => SecoundCoffeeFlavour.createCoffeeFlavour(DTO))
		)
	);
}

export function fetchFinalTypeFlavours(): Observable<
	Array<FinalCoffeeFlavour>
> {
	return getSpecificTypeOfCoffeeFlavour("finalFlavourProfile").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => FinalCoffeeFlavour.createCoffeeFlavour(DTO))
		)
	);
}
