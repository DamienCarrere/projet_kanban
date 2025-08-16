import { cAAE } from "./createAndAddElements.js";

export function addChecklistItem(container, text, checked) {
	const li = cAAE("li", "", container);

	const checkbox = cAAE("input", "", li);
	checkbox.type = "checkbox";
	checkbox.checked = checked;

	const span = cAAE("span", text, li);
	span.textContent = text;

	const btnDelete = cAAE("button", "❌", li);
	btnDelete.addEventListener("click", () => {
		container.removeChild(li);
	});
}
