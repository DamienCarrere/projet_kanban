// --------------------------- Create And Add Element Class
export function cAAE(type, content = "", parent = document.body, refParent) {
	let elementType = document.createElement(type);
	elementType.textContent = content;

	if (refParent) {
		parent.insertBefore(elementType, refParent);
	} else {
		parent.appendChild(elementType);
	}
	return elementType;
}
// --------------------------- Create And Add Element Class (sans parents)
export function cAAEWP(type, content = "") {
	let elementType = document.createElement(type);
	elementType.textContent = content;

	return elementType;
}
// --------------------------- Create And Add Element Class (sans parents)
export function cAAECWP(type, addClass, content = "") {
	let elementType = document.createElement(type);
	elementType.className = addClass;
	elementType.textContent = content;

	return elementType;
}
// --------------------------- Create And Add Element Class
export function cAAEC(
	type,
	addClass,
	content = "",
	parent = document.body,
	refParent
) {
	let elementType = document.createElement(type);
	elementType.className = addClass;
	elementType.textContent = content;

	if (refParent) {
		parent.insertBefore(elementType, refParent);
	} else {
		parent.appendChild(elementType);
	}
	return elementType;
}

// --------------------------- Create And Add Element ID
export function cAAEID(
	type,
	addID,
	content = "",
	parent = document.body,
	refParent
) {
	let elementType = document.createElement(type);
	elementType.id = addID;
	elementType.textContent = content;

	if (refParent) {
		parent.insertBefore(elementType, refParent);
	} else {
		parent.appendChild(elementType);
	}
	return elementType;
}
