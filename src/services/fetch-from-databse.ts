import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import CoffeeFlavour from "../models/coffee-flavour";
import CoffeeBean from "../models/coffee-bean";

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
			DTOs.map((DTO: any) => createPrimaryCoffeeFlavour(DTO))
		)
	);
}

function createPrimaryCoffeeFlavour(DTO: any): CoffeeFlavour {
	return new CoffeeFlavour(DTO["id"], DTO["flavour"], "0");
}

export function fetchSecondaryTypeFlavours(): Observable<Array<CoffeeFlavour>> {
	return getCoffeeFlavour("secondCoffeeFlavour").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => createSecondaryCoffeeFlavour(DTO))
		)
	);
}

function createSecondaryCoffeeFlavour(DTO: any): CoffeeFlavour {
	return new CoffeeFlavour(
		DTO["id"],
		DTO["flavour"],
		DTO["firstCoffeeFlavourId"]
	);
}

export function fetchFinalTypeFlavours(): Observable<Array<CoffeeFlavour>> {
	return getCoffeeFlavour("finalFlavourProfile").pipe(
		map((DTOs: Array<any>) =>
			DTOs.map((DTO: any) => createFinalCoffeeFlavour(DTO))
		)
	);
}

function createFinalCoffeeFlavour(DTO: any): CoffeeFlavour {
	return new CoffeeFlavour(
		DTO["id"],
		DTO["flavour"],
		DTO["secondCoffeeFlavourId"]
	);
}

export function fetchCoffeeBean(): Observable<Array<CoffeeBean>> {
	return getCoffeeFlavour("coffeeBeans").pipe(
		map((DTOs: Array<any>) => DTOs.map((DTO: any) => createCoffeeBean(DTO)))
	);
}

function createCoffeeBean(DTO: any): CoffeeBean {
	let finalFlavourProfileIDs = DTO["finalFlavourProfileIDs"].map(
		(dto: any) => dto["id"]
	);

	return new CoffeeBean(DTO["name"], finalFlavourProfileIDs, DTO["link"]);
}
