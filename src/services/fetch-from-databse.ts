import { from, Observable, zip, empty } from "rxjs";
import { map, concatAll } from "rxjs/operators";
import CoffeeFlavour from "../models/coffee-flavour";
import CoffeeBean from "../models/coffee-bean";

const DATA_BASE_URL: string = "http://localhost:3000/";

function getCoffeeFlavour(specificType: string): Observable<CoffeeFlavour> {
	return from(
		fetch(DATA_BASE_URL + specificType).then((data: Response) => data.json())
	).pipe(concatAll());
}

export function fetchPrimaryTypeFlavours(): Observable<CoffeeFlavour> {
	return getCoffeeFlavour("firstCoffeeFlavour").pipe(
		map((DTO: any) => createPrimaryCoffeeFlavour(DTO))
	);
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

export function fetchSecondaryTypeFlavours(
	ids: Array<string>
): Observable<CoffeeFlavour> {
	if (ids.length === 0) {
		return empty();
	}

	let flavours: Array<Observable<CoffeeFlavour>> = ids.map((id: string) =>
		fetchSpecificSecondaryTypeFlavour(id)
	);
	return zip(...flavours).pipe(concatAll());
}

function fetchSpecificSecondaryTypeFlavour(
	id: string
): Observable<CoffeeFlavour> {
	return getCoffeeFlavour("secondaryCoffeeFlavour?id=" + id).pipe(
		map((DTO: any) => createSecondaryCoffeeFlavour(DTO))
	);
}

function createSecondaryCoffeeFlavour(DTO: any): CoffeeFlavour {
	return new CoffeeFlavour(
		DTO["id"],
		DTO["flavour"],
		createIdsFromDTOArray(DTO["finalFlavourIds"])
	);
}

export function fetchFinalTypeFlavours(
	ids: Array<string>
): Observable<CoffeeFlavour> {
	if (ids.length === 0) {
		return empty();
	}

	let flavours: Array<Observable<CoffeeFlavour>> = ids.map((id: string) =>
		fetchSpecificFinalTypeCoffeeFlavour(id)
	);
	return zip(...flavours).pipe(concatAll());
}

function fetchSpecificFinalTypeCoffeeFlavour(
	id: string
): Observable<CoffeeFlavour> {
	return getCoffeeFlavour("finalCoffeeFlavour?id=" + id).pipe(
		map((DTO: any) => createFinalCoffeeFlavour(DTO))
	);
}

function createFinalCoffeeFlavour(DTO: any): CoffeeFlavour {
	return new CoffeeFlavour(
		DTO["id"],
		DTO["flavour"],
		createIdsFromDTOArray(DTO["coffeeBeansIds"])
	);
}

export function fetchCoffeeBean(ids: Array<string>): Observable<CoffeeBean> {
	if (ids.length === 0) {
		return empty();
	}

	let flavours: Array<Observable<CoffeeBean>> = ids.map((id: string) =>
		fetchSpecificTypeOfCoffeeBean(id)
	);
	return zip(...flavours).pipe(concatAll());
}

function fetchSpecificTypeOfCoffeeBean(id: string): Observable<CoffeeBean> {
	return getCoffeeFlavour("coffeeBeans?id=" + id).pipe(
		map((DTO: any) => createCoffeeBean(DTO))
	);
}

function createCoffeeBean(DTO: any): CoffeeBean {
	return new CoffeeBean(DTO["id"], DTO["name"], DTO["link"]);
}
