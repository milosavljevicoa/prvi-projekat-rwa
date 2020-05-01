import CoffeePickerView from "./view/coffee-picker-view";
import { fetchFirstTypeFlavours } from "./services/coffee-picker";
import FirstCoffeeFlavour from "./models/first-coffee-flavour";

const firstTypeCoffeeFlavourDiv: HTMLDivElement | null = <HTMLDivElement>(
	document.getElementById("first-type")
);

const secondTypeOfCoffeeFlavourDiv: HTMLDivElement | null = <HTMLDivElement>(
	document.getElementById("second-type")
);

const finalTypeOfCoffeeFlavourDiv: HTMLDivElement | null = <HTMLDivElement>(
	document.getElementById("final-type")
);

const view: CoffeePickerView = new CoffeePickerView();

if (firstTypeCoffeeFlavourDiv !== null) {
	view.drawFirstCoffeeFlavours(
		firstTypeCoffeeFlavourDiv,
		fetchFirstTypeFlavours()
	);
}

if (secondTypeOfCoffeeFlavourDiv !== null) {
	view.drawSecoundCoffeeFlavours(
		secondTypeOfCoffeeFlavourDiv,
		FirstCoffeeFlavour.myStream
	);
	// drawCoffeeFlavours(secondTypeOfCoffeeFlavourDiv, FirstCoffeeFlavour.myStream);
}
