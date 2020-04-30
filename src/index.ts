import { drawCoffeeFlavourList } from "./view/draw-list";
import { getFirstTypeOfCoffeeFlavour } from "./services/coffee-picker";

const firstTypeCoffeeFlavourDiv: HTMLDivElement | null = <HTMLDivElement>(
	document.getElementById("first-type")
);

if (firstTypeCoffeeFlavourDiv !== null) {
	drawCoffeeFlavourList(firstTypeCoffeeFlavourDiv);
}

getFirstTypeOfCoffeeFlavour().subscribe((data) => console.log(data));
