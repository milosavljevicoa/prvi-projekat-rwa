import { from, Observable, zip, empty } from "rxjs";
import { map, concatAll } from "rxjs/operators";
import CoffeeFlavour from "../models/coffee-flavour";
import CoffeeBean from "../models/coffee-bean";

const DATA_BASE_URL: string = "http://localhost:3000/";

function getCoffeeFlavour$(specificType: string): Observable<CoffeeFlavour> {
	return from(
		fetch(DATA_BASE_URL + specificType).then((data: Response) => data.json())
	).pipe(concatAll());
}

function fetchTypeOfFlavours$(
	typeOfFlavour: string,
	convertToFlavour: (DTO: any) => CoffeeFlavour
): Observable<CoffeeFlavour> {
	return getCoffeeFlavour$(typeOfFlavour).pipe(
		map((DTO: any) => convertToFlavour(DTO))
	);
}

export function fetchPrimaryTypeFlavours$(): Observable<CoffeeFlavour> {
	return fetchTypeOfFlavours$("firstCoffeeFlavour", createPrimaryCoffeeFlavour);
}

function createPrimaryCoffeeFlavour(DTO: any): CoffeeFlavour {
	return new CoffeeFlavour(
		DTO["id"],
		DTO["flavour"],
		createIdsFromDTOArray(DTO["secondaryCoffeeFlavourIds"])
	);
}

function createIdsFromDTOArray(DTO: Array<any>): Array<string> {
	let ids: Array<string> = new Array<string>();
	ids = DTO.map((DTOid: any) => DTOid["id"]);
	return ids;
}

function fetchPreciseTypeOfFlavours$(
	ids: Array<string>,
	fetchOneTypeOfFlavour$: (id: string) => Observable<CoffeeFlavour>
): Observable<CoffeeFlavour> {
	if (ids.length === 0) {
		return empty();
	}

	let flavours: Array<Observable<CoffeeFlavour>> = ids.map((id: string) =>
		fetchOneTypeOfFlavour$(id)
	);
	return zip(...flavours).pipe(concatAll());
}

export function fetchPreciseSecondaryTypeFlavours$(
	ids: Array<string>
): Observable<CoffeeFlavour> {
	return fetchPreciseTypeOfFlavours$(ids, fetchOneSecondaryTypeFlavour$);
}

function fetchOneSecondaryTypeFlavour$(id: string): Observable<CoffeeFlavour> {
	return fetchTypeOfFlavours$(
		"secondaryCoffeeFlavour?id=" + id,
		createSecondaryCoffeeFlavour
	);
}

function createSecondaryCoffeeFlavour(DTO: any): CoffeeFlavour {
	return new CoffeeFlavour(
		DTO["id"],
		DTO["flavour"],
		createIdsFromDTOArray(DTO["finalFlavourIds"])
	);
}

export function fetchPreciseFinalTypeFlavours$(
	ids: Array<string>
): Observable<CoffeeFlavour> {
	return fetchPreciseTypeOfFlavours$(ids, fetchOneFinalTypeCoffeeFlavour$);
}

function fetchOneFinalTypeCoffeeFlavour$(
	id: string
): Observable<CoffeeFlavour> {
	return fetchTypeOfFlavours$(
		"finalCoffeeFlavour?id=" + id,
		createFinalCoffeeFlavour
	);
}

function createFinalCoffeeFlavour(DTO: any): CoffeeFlavour {
	return new CoffeeFlavour(
		DTO["id"],
		DTO["flavour"],
		createIdsFromDTOArray(DTO["coffeeBeansIds"])
	);
}

export function fetchPreciseCoffeeBean$(
	ids: Array<string>
): Observable<CoffeeBean> {
	return <Observable<CoffeeBean>>(
		fetchPreciseTypeOfFlavours$(ids, fetchOneTypeOfCoffeeBean$)
	);
}

function fetchOneTypeOfCoffeeBean$(id: string): Observable<CoffeeBean> {
	return <Observable<CoffeeBean>>(
		fetchTypeOfFlavours$("coffeeBeans?id=" + id, createCoffeeBean)
	);
}

function createCoffeeBean(DTO: any): CoffeeBean {
	return new CoffeeBean(DTO["id"], DTO["name"], DTO["link"]);
}
