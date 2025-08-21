import { makeNode } from "../utils/makeNode.js";
import { createList } from "./createList.js";
import { changeBackground } from "./changeBackground.js";
import { dragAndDropList } from "./dragAndDrop.js";

export function startingPage() {
	const divHeader = makeNode({ type: "div", className: "divHeader" });
	const titleHeader = makeNode({
		type: "h1",
		className: "titleHeader",
		content: "KANBAN BOARD",
		parent: divHeader,
		attributes: { contentEditable: true },
		events: {
			click: () => {
				titleHeader.contentEditable = true;
				titleHeader.focus();
			},
			blur: () => {
				titleHeader.contentEditable = false;
				if (titleHeader.textContent.trim() === "") {
					titleHeader.textContent = "Sans titre";
				}
			},
			keydown: (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					titleHeader.blur();
				}
			},
		},
	});

	const btnAddList = makeNode({
		type: "button",
		className: "btnAddList",
		content: "➕ Ajouter une liste",
		parent: divHeader,
		events: { click: () => createList(lists) },
	});

	let lists = makeNode({
		type: "div",
		className: "lists",
		events: {
			dragover: (e) => {
				e.preventDefault();

				const draggingList = document.querySelector(".draggingList");
				const draggingTask = document.querySelector(".dragging");

				if (draggingTask) return;

				if (!draggingList) return;

				const afterElement = dragAndDropList(lists, e.clientX);
				if (afterElement) {
					lists.insertBefore(draggingList, afterElement);
				} else {
					lists.appendChild(draggingList);
				}
			},
		},
	});

	changeBackground(divHeader);
}
