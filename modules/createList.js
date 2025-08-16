import { cAAEC, cAAECWP } from "./createAndAddElements.js";
import { createTask } from "./createTask.js";
import { dragAndDropTask } from "./dragAndDrop.js";

export function createList(lists) {
	const addNewList = cAAEC("div", "newList", "", lists);
	addNewList.setAttribute("draggable", true);
	const divCol = cAAEC("div", "divCol", "", addNewList);
	const listTitle = cAAEC("h3", "listTitle", "Sans titre", divCol);
	const deleteList = cAAECWP("button", "deleteList", "🗑 Supprimer la liste"); //reminder : à créer sans parents pour ne pas s'afficher lors de la création de la liste (comme ça on peut directement supprimer l'enfant avec appendChild et removeChild plus tard)
	const divTask = cAAEC("div", "divtasks", "", addNewList);
	const addTask = cAAEC("button", "addTask", "➕ Ajouter une tâche", divTask);

	//Pas obligatoire mais toujours plus ergonomique, on a le focus sur le titre de la liste
	listTitle.contentEditable = true;
	listTitle.focus();
	if (!divCol.contains(deleteList)) {
		divCol.appendChild(deleteList);
	}
	// Empecher que le bouton disparaisse en cliquant dessus (focus qui se perd à cause du blur)
	deleteList.addEventListener("mousedown", (e) => {
		e.preventDefault();
	});

	// Pop up supprimer
	deleteList.addEventListener("click", () => {
		if (
			confirm(`Voulez-vous vraiment supprimer ${listTitle.textContent}?`)
		) {
			addNewList.remove();
		}
	});

	// Editer titre
	listTitle.addEventListener("click", () => {
		listTitle.contentEditable = true;
		listTitle.focus();
		if (!divCol.contains(deleteList)) {
			divCol.appendChild(deleteList);
		}
	});

	//Empecher l'edition
	listTitle.addEventListener("blur", () => {
		listTitle.contentEditable = false;
		if (listTitle.textContent.trim() === "") {
			listTitle.textContent = "Sans titre";
		}
		if (divCol.contains(deleteList)) {
			divCol.removeChild(deleteList);
		}
	});

	//Empecher la touche entrer
	listTitle.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			listTitle.blur();
		}
	});

	addTask.addEventListener("click", () => {
		createTask(divTask);
	});

	addNewList.addEventListener("dragstart", (e) => {
		e.dataTransfer.setData("type", "list");
		addNewList.classList.add("draggingList");
	});

	addNewList.addEventListener("dragend", () => {
		addNewList.classList.remove("draggingList");
	});

	divTask.addEventListener("dragover", (e) => {
		e.preventDefault();

		const draggingTask = document.querySelector(".dragging");
		if (!draggingTask) return;

		const afterElement = dragAndDropTask(divTask, e.clientY);
		if (afterElement) {
			divTask.insertBefore(draggingTask, afterElement);
		} else {
			divTask.appendChild(draggingTask);
		}
	});
}
