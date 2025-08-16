import { cAAEC, cAAE } from "./createAndAddElements.js";

export function changeBackground(parent) {
	const changeBackgroud = cAAEC(
		"button",
		"changeBackground",
		"Changer le fond d'écran",
		parent
	);

	// Input file caché
	const inputFile = cAAE("input", "", parent);
	inputFile.type = "file";
	inputFile.accept = "image/*";
	inputFile.style.display = "none";
	parent.appendChild(inputFile);

	// Click bouton → ouvre sélection de fichier
	changeBackgroud.addEventListener("click", () => {
		inputFile.click();
	});

	// Quand on choisit une image
	inputFile.addEventListener("change", () => {
		const file = inputFile.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				document.body.style.backgroundImage = `url('${e.target.result}')`;
				document.body.style.backgroundSize = "cover";
				document.body.style.backgroundPosition = "bottom center";
				document.body.style.backgroundRepeat = "no-repeat";
				window.saveState();
			};
			reader.readAsDataURL(file);
		}
	});
}
