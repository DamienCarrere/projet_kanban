import { cAAEC, cAAECWP } from "./createAndAddElements.js";
import { taskPopup } from "./taskPopup.js";

export function createTask(listElement) {
	const task = cAAEC("div", "task", "", listElement);
	task.setAttribute("draggable", true);
	const taskContent = cAAEC("p", "taskContent", "Nouvelle tâche", task);
	const taskDate = cAAEC("small", "taskDate", "", task);
	const deleteTask = cAAECWP("button", "deleteTask", "❌ Supprimer");

	// Editer contenu tâche
	task.addEventListener("click", (e) => {
		if (e.target === deleteTask) return;
		taskPopup(task, taskContent, taskDate);
	});

	//Afficher bouton (survol de la souris)
	task.addEventListener("mouseenter", () => {
		if (!task.contains(deleteTask)) {
			task.appendChild(deleteTask);
		}
	});
	task.addEventListener("mouseleave", () => {
		if (task.contains(deleteTask)) {
			task.removeChild(deleteTask);
		}
	});

	// Empecher que le bouton disparaisse en cliquant dessus (focus qui se perd à cause du blur)
	deleteTask.addEventListener("mousedown", (e) => e.preventDefault());
	// Supprime
	deleteTask.addEventListener("click", () => {
		task.remove();
	});

	task.addEventListener("dragstart", (e) => {
		e.dataTransfer.setData("text/plain", "");
		task.classList.add("dragging");
	});

	task.addEventListener("dragend", () => {
		task.classList.remove("dragging");
	});
	console.log(task);
}
