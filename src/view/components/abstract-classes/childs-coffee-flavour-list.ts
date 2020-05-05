import CoffeeFlavourList from "./coffee-flavour-list";

abstract class ChildsCoffeeFlavourLists extends CoffeeFlavourList {
	public abstract clearList(idsToDisplay: Array<string>): void;
}

export default ChildsCoffeeFlavourLists;
