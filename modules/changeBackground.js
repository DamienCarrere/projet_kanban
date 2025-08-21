export function changeBackground() {
	const changeBackground = document.getElementById("changeBackground");
	const inputBackground = document.getElementById("inputBackground");

	changeBackground.addEventListener("click", () => {
		inputBackground.click();
	});

	inputBackground.addEventListener("change", () => {
		const file = inputBackground.files[0];
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
