import { makeNode } from "../utils/makeNode.js";

export function changeBackground(parent) {
	const changeBackground = makeNode({
		type: "button",
		className: "changeBackground",
		content: "Changer le fond d'écran",
		parent: parent,
		events: {
			click: () => {
				inputFile.click();
			},
		},
	});

	const inputFile = makeNode({
		type: "input",
		attributes: {
			type: "file",
			accept: "image/*",
			style: "display: none",
		},
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
