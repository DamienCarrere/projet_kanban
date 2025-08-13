import { cAAE, cAAEC } from "./createAndAddElements.js";

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

	// Bouton enregistrer
	const saveButton = cAAE("button", "Enregistrer", popup);
	saveButton.addEventListener("click", () => {
		titleElement.textContent = inputTitle.value.trim() || "Sans titre";
		dateElement.textContent = inputDate.value;
		task.style.borderColor = inputColor.value;
		task.dataset.color = inputColor.value;
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
