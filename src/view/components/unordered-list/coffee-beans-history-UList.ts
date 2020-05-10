import { Subject, Observable, fromEvent, throwError } from "rxjs";
import { map, mergeAll, takeUntil, tap } from "rxjs/operators";
import CoffeeLinkListItem from "../list-item/coffee-link-list-item";
import { createCoffeeLinkListItem } from "../../../services/create-elements-with-className";

class CoffeeBeansHistoryUList {
	private _list!: HTMLUListElement;
	private _host: HTMLDivElement;
	private _clickToSaveHistory: Observable<Event>;
	private _currentLengthOfHistoryLI: number;
	private _maxLenghtOfHistoryLI: number;

	constructor(private _coffeeBeanNameWithLink: Subject<Array<string>>) {
		this._currentLengthOfHistoryLI = 0;
		this._maxLenghtOfHistoryLI = 10;

		this._host = <HTMLDivElement>document.getElementById("coffee-links");

		this._list = document.createElement("ul");
		this._list.className = "list-group";

		const saveHistoryButton: HTMLButtonElement = <HTMLButtonElement>(
			document.getElementById("save-history")
		);

		this._clickToSaveHistory = fromEvent(saveHistoryButton, "click");
	}

	public drawHistoryList() {
		if (this._host == null) return;
		this._host.appendChild(this._list);
		this.drawListItems();
	}

	private drawListItems(): void {
		this.configureStream().subscribe({
			next(link: CoffeeLinkListItem) {
				link.drawListItem();
			},
			complete() {
				alert(
					`You can no longer add to history \n Your history has been saved`
				);
			},
			error(message: string) {
				alert(message);
			},
		});
	}

	private configureStream(): Observable<CoffeeLinkListItem> {
		return this._coffeeBeanNameWithLink.pipe(
			takeUntil(this._clickToSaveHistory),
			map((coffeeBeanNameWithLinkToDisplay: Array<string>) => {
				if (this._currentLengthOfHistoryLI === this._maxLenghtOfHistoryLI)
					throw new Error(
						`You have reached maximum amount of coffee beans (${this._maxLenghtOfHistoryLI}).\n` +
							`You can't add more coffee beans to your history`
					);
				return createCoffeeLinkListItem(
					coffeeBeanNameWithLinkToDisplay,
					this._list
				);
			}),
			mergeAll(),
			tap(() => {
				this._currentLengthOfHistoryLI++;
			})
		);
	}
}

export default CoffeeBeansHistoryUList;
