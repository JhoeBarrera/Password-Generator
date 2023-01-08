const checkboxes = document.querySelectorAll(".app__input-checkbox");
const passwordLengthTxt = document.getElementById("passwordLengthTxt");
const passwordRangeInput = document.getElementById("passwordRangeInput");

passwordRangeInput.addEventListener("change", (e) => {
	printData(passwordLengthTxt, passwordRangeInput.value);
});

function printData(objTxt, txt) {
	objTxt.textContent = txt;
}

printData(passwordLengthTxt, passwordRangeInput.value);

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("click", () => {
		let numberCheckboxDisabled = 0;
		for (const i of checkboxes) {
			if (i.checked === false) numberCheckboxDisabled += 1;
		}
		if (numberCheckboxDisabled === checkboxes.length)
			checkboxes[Math.floor(Math.random() * numberCheckboxDisabled)].checked = true;
	});
});
