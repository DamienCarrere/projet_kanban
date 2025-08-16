import { cAAE, cAAEC } from "./createAndAddElements.js";
import { addChecklistItem } from "./addCkecklistItem.js";

export function taskPopup(task, titleElement, dateElement) {
	// Overlay
	const overlay = cAAEC("div", "popupOverlay", "");

	// Conteneur pop-up
	const popup = cAAEC("div", "popupContent", "", overlay);

	const h2 = cAAE("h2", "Modifier la tâche", popup);

	// Champ titre
	const inputTitle = cAAE("input", "", popup);
	inputTitle.type = "text";
	inputTitle.value = titleElement.textContent;

	// Champ date
	const inputDate = cAAE("input", "", popup);
	inputDate.type = "date";
	inputDate.value = dateElement.textContent;

	// Champ couleur
	const inputColor = cAAE("input", "", popup);
	inputColor.type = "color";
	inputColor.value = task.dataset.color || "#dddddd";
	const originalColor = task.dataset.color || "#dddddd";
	inputColor.addEventListener("input", () => {
		task.style.borderColor = inputColor.value;
	});

	// --- Checklist
	const checklistContainer = cAAEC("div", "checklistContainer", "", popup);

	const checklistTitle = cAAE("h3", "Checklist", checklistContainer);

	const checklistList = cAAE("ul", "", checklistContainer);

	let checklistData = task.dataset.checklist
		? task.dataset.checklist.split("||")
		: [];
	checklistData.forEach((item) => {
		const [checked, text] = item.split("|");
		addChecklistItem(checklistList, text, checked === "1");
	});

	// Formulaire ajout item
	const checklistInput = cAAE("input", "", checklistContainer);
	checklistInput.type = "text";
	checklistInput.placeholder = "Nouvel élément...";

	const checklistAddBtn = cAAE("button", "Ajouter", checklistContainer);
	checklistAddBtn.addEventListener("click", () => {
		if (checklistInput.value.trim() !== "") {
			addChecklistItem(checklistList, checklistInput.value, false);
			checklistInput.value = "";
		}
	});

	// Bouton enregistrer
	const saveButton = cAAE("button", "Enregistrer", popup);
	saveButton.addEventListener("click", () => {
		titleElement.textContent = inputTitle.value.trim() || "Sans titre";
		dateElement.textContent = inputDate.value;
		task.style.borderColor = inputColor.value;
		task.dataset.color = inputColor.value;

		let savedItems = [];
		let checkedCount = 0;
		checklistList.querySelectorAll("li").forEach((li) => {
			const cb = li.querySelector("input");
			const span = li.querySelector("span");
			if (cb.checked) checkedCount++;
			savedItems.push(`${cb.checked ? "1" : "0"}|${span.textContent}`);
		});
		task.dataset.checklist = savedItems.join("||");

		// Maj compteur
		let counter = task.querySelector(".checklistCount");
		if (!counter) {
			counter = document.createElement("span");
			counter.className = "checklistCount";
			task.appendChild(counter);
		}
		counter.textContent = `${checkedCount}/${savedItems.length} ✅`;

		document.body.removeChild(overlay);
	});

	// Bouton annuler
	const cancelButton = cAAE("button", "Annuler", popup);
	cancelButton.textContent = "Annuler";
	cancelButton.addEventListener("click", () => {
		task.style.borderColor = originalColor;
		document.body.removeChild(overlay);
	});
}
