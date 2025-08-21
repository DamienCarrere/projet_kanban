import { makeNode } from "../utils/makeNode.js";
import { taskPopup } from "./taskPopup.js";

export function createTask(listElement) {
	const task = makeNode({
		type: "div",
		className: "task",
		parent: listElement,
		attributes: { draggable: true },
		events: {
			dragstart: () => {
				task.classList.add("dragging");
			},
			dragend: () => {
				task.classList.remove("dragging");
			},
			mouseenter: () => {
				if (!task.contains(deleteTask)) {
					task.appendChild(deleteTask);
				}
			},
			mouseleave: () => {
				if (task.contains(deleteTask)) {
					task.removeChild(deleteTask);
				}
			},
			click: (e) => {
				if (e.target === deleteTask) return;
				if (task.classList.contains("dragging")) return;
				taskPopup(task, taskContent, taskDate);
			},
		},
	});

	const taskContent = makeNode({
		type: "p",
		className: "taskContent",
		content: "Nouvelle tâche",
		parent: task,
	});

	const taskDate = makeNode({
		type: "small",
		className: "taskDate",
		parent: task,
	});

	const deleteTask = makeNode({
		type: "button",
		className: "deleteTask",
		content: "❌ Supprimer",
		parent: task,
		events: {
			mousedown: (e) => e.preventDefault(),
			click: () => task.remove(),
		},
	});
	task.removeChild(deleteTask);
}
