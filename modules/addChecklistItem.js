import { makeNode } from "../utils/makeNode.js";

export function addChecklistItem(container, text, checked) {
	const li = makeNode({ type: "li", parent: container });

	const checkbox = makeNode({
		type: "input",
		parent: li,
		attributes: { type: "checkbox" },
	});

	const span = makeNode({ type: "span", content: text, parent: li });

	const btnDelete = makeNode({
		type: "button",
		content: "❌",
		parent: li,
		attributes: {
			"aria-label": `Bouton pour supprimer la checklist ${text}`,
		},
		events: { click: () => container.removeChild(li) },
	});
}
