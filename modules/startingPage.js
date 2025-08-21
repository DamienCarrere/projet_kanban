import { createList } from "./createList.js";
import { changeBackground } from "./changeBackground.js";
import { dragAndDropList } from "./dragAndDrop.js";

export function startingPage() {
	const divHeader = document.querySelector(".divHeader");
	const titleHeader = divHeader.querySelector(".titleHeader");
	const btnAddList = divHeader.querySelector(".btnAddList");
	const lists = document.querySelector(".lists");

	titleHeader.addEventListener("click", () => {
		titleHeader.contentEditable = true;
		titleHeader.focus();
	});

	titleHeader.addEventListener("blur", () => {
		titleHeader.contentEditable = false;
		if (titleHeader.textContent.trim() === "") {
			titleHeader.textContent = "Sans titre";
		}
	});

	titleHeader.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			titleHeader.blur();
		}
	});

	btnAddList.addEventListener("click", () => createList(lists));

	lists.addEventListener("dragover", (e) => {
		e.preventDefault();
		const draggingList = document.querySelector(".draggingList");
		const draggingTask = document.querySelector(".dragging");

		if (draggingTask || !draggingList) return null;

		const afterElement = dragAndDropList(lists, e.clientX);
		if (afterElement) {
			lists.insertBefore(draggingList, afterElement);
		} else {
			lists.appendChild(draggingList);
		}
	});

	changeBackground(divHeader);
}
