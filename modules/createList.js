import { makeNode } from "../utils/makeNode.js";
import { createTask } from "./createTask.js";
import { dragAndDropTask } from "./dragAndDrop.js";

export function createList(lists) {
	const addNewList = makeNode({
		type: "div",
		className: "newList",
		parent: lists,
		attributes: { draggable: true },
		events: {
			dragstart: (e) => {
				e.dataTransfer.setData("type", "list");
				addNewList.classList.add("draggingList");
			},
			dragend: () => {
				addNewList.classList.remove("draggingList");
			},
		},
	});

	const divCol = makeNode({
		type: "div",
		className: "divCol",
		parent: addNewList,
	});

	const listTitle = makeNode({
		type: "h3",
		className: "listTitle",
		content: "Sans titre",
		parent: divCol,
		attributes: { contentEditable: true },
		events: {
			click: () => {
				listTitle.contentEditable = true;
				listTitle.focus();
				if (!divCol.contains(deleteList)) {
					divCol.appendChild(deleteList);
				}
			},
			blur: () => {
				{
					listTitle.contentEditable = false;
					if (listTitle.textContent.trim() === "") {
						listTitle.textContent = "Sans titre";
					}
					if (divCol.contains(deleteList)) {
						divCol.removeChild(deleteList);
					}
				}
			},
			keydown: (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					listTitle.blur();
				}
			},
		},
	});

	const deleteList = makeNode({
		type: "button",
		className: "deleteList",
		content: "🗑 Supprimer la liste",
		events: {
			click: () => {
				if (
					confirm(
						`Voulez-vous vraiment supprimer ${listTitle.textContent}?`
					)
				) {
					addNewList.remove();
				}
			},
			mousedown: (e) => e.preventDefault(),
		},
	});

	const divTask = makeNode({
		type: "div",
		className: "divtasks",
		parent: addNewList,
		events: {
			dragover: (e) => {
				e.preventDefault();
				const draggingTask = document.querySelector(".dragging");
				if (!draggingTask) return;

				const afterElement = dragAndDropTask(divTask, e.clientY);
				if (afterElement) {
					divTask.insertBefore(draggingTask, afterElement);
				} else {
					divTask.appendChild(draggingTask);
				}
			},
		},
	});

	const addTask = makeNode({
		type: "button",
		className: "addTask",
		content: "➕ Ajouter une tâche",
		parent: addNewList,
		refParent: divTask,
		events: { click: () => createTask(divTask) },
	});

	listTitle.focus();
	if (!divCol.contains(deleteList)) {
		divCol.appendChild(deleteList);
	}
}
