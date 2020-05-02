import CoffeePickerView from "./view/coffee-picker-view";
import { fetchFirstTypeFlavours } from "./services/fetch-from-databse";
import PrimaryCoffeeFlavour from "./models/primary-coffee-flavour";

const firstTypeCoffeeFlavourDiv: HTMLDivElement | null = <HTMLDivElement>(
	document.getElementById("first-type")
);

const finalTypeOfCoffeeFlavourDiv: HTMLDivElement | null = <HTMLDivElement>(
	document.getElementById("final-type")
);

const view: CoffeePickerView = new CoffeePickerView();

view.drawCompletedView();

// if (firstTypeCoffeeFlavourDiv !== null) {
// 	view.drawFirstCoffeeFlavours(
// 		firstTypeCoffeeFlavourDiv,
// 		fetchFirstTypeFlavours()
// 	);
// }
