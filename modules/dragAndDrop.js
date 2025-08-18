export function dragAndDropTask(container, y) {
	const draggableElements = [
		...container.querySelectorAll(".task:not(.dragging)"),
	];
	if (draggableElements.length === 0) {
		return null;
	}
	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			}
			return closest;
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}

export function dragAndDropList(container, x) {
	const draggableElements = [
		...container.querySelectorAll(".newList:not(.draggingList)"),
	];
	if (draggableElements.length === 0) {
		return null;
	}
	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = x - box.left - box.width / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			}
			return closest;
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}
