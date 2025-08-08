export function save(kanbanLocalSave, dataKanban) {
	localStorage.setItem(kanbanLocalSave, JSON.stringify(dataKanban));
}

export function load(kanbanLocalSave) {
	const loadItem = localStorage.getItem(kanbanLocalSave);
	const loadKanban = loadItem ? JSON.parse(loadItem) : [];
}
