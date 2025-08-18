import { cAAEC, cAAE } from "./createAndAddElements.js";

export function changeBackground(parent) {
	const changeBackground = cAAEC(
		"button",
		"changeBackground",
		"Changer le fond d'écran",
		parent
	);

	const inputFile = cAAE("input", "", parent);
	inputFile.type = "file";
	inputFile.accept = "image/*";
	inputFile.style.display = "none";

	changeBackground.addEventListener("click", () => {
		inputFile.click();
	});

	inputFile.addEventListener("change", () => {
		const file = inputFile.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				document.body.style.backgroundImage = `url('${e.target.result}')`;
				document.body.style.backgroundSize = "cover";
				document.body.style.backgroundPosition = "bottom center";
				document.body.style.backgroundRepeat = "no-repeat";
			};
			reader.readAsDataURL(file);
		}
	});
}
