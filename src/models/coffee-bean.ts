// import CoffeeFlavour from "./coffee-flavour";

// class CoffeeBeans extends CoffeeFlavour {
// 	constructor(
// 		id: string,
// 		typeOfFlavour: string,
// 		private _parrentFlavourId: Array<any>,
// 		private _urlToCoffeeBean: string
// 	) {
// 		super(id, typeOfFlavour);
// 	}

// 	get parrentFlavourId(): string {
// 		let idsSeperatedByComma: string = this._parrentFlavourId.reduce(
// 			(finalString, currentDTO) => {
// 				let id = currentDTO["id"];
// 				finalString += `${id},`;
// 				return finalString;
// 			},
// 			""
// 		);
// 		return idsSeperatedByComma.slice(0, -1);
// 	}

// 	public get urlToCoffeeBean(): string {
// 		return this._urlToCoffeeBean;
// 	}

// 	public static createCoffeeBeans(DTO: any): CoffeeBeans {
// 		let bean: CoffeeBeans = new CoffeeBeans(
// 			DTO["id"],
// 			DTO["name"],
// 			DTO["finalFlavourProfileIDs"],
// 			DTO["link"]
// 		);
// 		return bean;
// 	}
// }

// export default CoffeeBeans;
