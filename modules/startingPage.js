import { cAAEC } from "./createAndAddElements.js";
import { createList } from "./createList.js";

export function startingPage() {
	const divHeader = cAAEC("div", "divHeader", "");
	const titleHeader = cAAEC("h1", "titleHeader", "KANBAN BOARD", divHeader);
	titleHeader.contentEditable = false;

	//Editer titre
	titleHeader.addEventListener("click", () => {
		titleHeader.contentEditable = true;
		titleHeader.focus();
	});
	//Empecher l'edition
	titleHeader.addEventListener("blur", () => {
		titleHeader.contentEditable = false;
		if (titleHeader.textContent.trim() === "") {
			titleHeader.textContent = "Sans titre";
		}
	});
	//Empecher la touche entrer
	titleHeader.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			titleHeader.blur();
		}
	});

	const btnAddList = cAAEC(
		"button",
		"btnAddList",
		"➕ Ajouter une liste",
		divHeader
	);

	let lists = cAAEC("div", "lists", "");

	btnAddList.addEventListener("click", () => {
		createList(lists);
	});
}
