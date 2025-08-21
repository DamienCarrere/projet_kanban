import { makeNode } from "../utils/makeNode.js";
import { addChecklistItem } from "./addChecklistItem.js";

export function taskPopup(task, titleElement, dateElement) {
	const overlay = makeNode({ type: "div", className: "popupOverlay" });

	const popup = makeNode({
		type: "div",
		className: "popupContent",
		parent: overlay,
	});

	const h2 = makeNode({
		type: "h2",
		content: "Modifier la tâche",
		parent: popup,
	});

	const inputTitle = makeNode({
		type: "input",
		parent: popup,
		attributes: { type: "text", value: titleElement.textContent },
	});

	const inputDate = makeNode({
		type: "input",
		parent: popup,
		attributes: { type: "date", value: dateElement.textContent },
	});

	const inputColor = makeNode({
		type: "input",
		parent: popup,
		attributes: { type: "color", value: task.dataset.color || "#dddddd" },
		events: { input: () => (task.style.borderColor = inputColor.value) },
	});
	const originalColor = task.dataset.color || "#dddddd";

	const checklistContainer = makeNode({
		type: "div",
		className: "checklistContainer",
		parent: popup,
	});

	const checklistTitle = makeNode({
		type: "h3",
		content: "Checklist",
		parent: checklistContainer,
	});

	const checklistList = makeNode({ type: "ul", parent: checklistContainer });

	const checklistInput = makeNode({
		type: "input",
		parent: checklistContainer,
		attributes: { type: "text", placeholder: "Nouvel élément..." },
	});

	const checklistAddBtn = makeNode({
		type: "button",
		content: "Ajouter",
		parent: checklistContainer,
		events: {
			click: () => {
				if (checklistInput.value.trim() !== "") {
					addChecklistItem(
						checklistList,
						checklistInput.value,
						false
					);
					checklistInput.value = "";
				}
			},
		},
	});

	const saveButton = makeNode({
		type: "button",
		content: "Enregistrer",
		parent: popup,
		events: {
			click: () => {
				titleElement.textContent =
					inputTitle.value.trim() || "Sans titre";
				dateElement.textContent = inputDate.value;
				task.style.borderColor = inputColor.value;
				task.dataset.color = inputColor.value;

				let savedItems = [];
				let checkedCount = 0;
				checklistList.querySelectorAll("li").forEach((li) => {
					const cb = li.querySelector("input");
					const span = li.querySelector("span");
					if (cb.checked) checkedCount++;
					savedItems.push(
						`${cb.checked ? "1" : "0"}|${span.textContent}`
					);
				});
				task.dataset.checklist = savedItems.join("||");

				let counter = task.querySelector(".checklistCount");
				if (!counter) {
					counter = document.createElement("span");
					counter.className = "checklistCount";
					task.appendChild(counter);
				}
				counter.textContent = `${checkedCount}/${savedItems.length} ✅`;

				document.body.removeChild(overlay);
			},
		},
	});

	const cancelButton = makeNode({
		type: "button",
		content: "Annuler",
		parent: popup,
		events: {
			click: () => {
				task.style.borderColor = originalColor;
				document.body.removeChild(overlay);
			},
		},
	});

	let checklistData = task.dataset.checklist
		? task.dataset.checklist.split("||")
		: [];
	checklistData.forEach((item) => {
		const [checked, text] = item.split("|");
		addChecklistItem(checklistList, text, checked === "1");
	});
}
