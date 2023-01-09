const checkboxes = document.querySelectorAll(".app__input-checkbox");

const passwordRangeInput = document.getElementById("passwordRangeInput");
const lowercaseOptionInput = document.getElementById("lowercaseOptionInput");
const uppercaseOptionInput = document.getElementById("uppercaseOptionInput");
const numbersOptionInput = document.getElementById("numbersOptionInput");
const symbolsOptionInput = document.getElementById("symbolsOptionInput");

const passwordLengthTxt = document.getElementById("passwordLengthTxt");
const passwordValueTxt = document.getElementById("passwordValueTxt");

const generatePasswordBtn = document.getElementById("generatePasswordBtn");

function printData(objTxt, txt) {
	objTxt.textContent = txt;
}

function getRandomLowercase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUppercase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
	const symbols = "!@#$%^&*()[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}

function createPassword(lower, upper, numbers, symbols, lengthPassword) {
	let finalPassword = "";
	let variationsCount = [lower, upper, numbers, symbols].filter((x) => x === true).length;
	for (let index = 0; index < lengthPassword; index += variationsCount) {
		if (lower) finalPassword += getRandomLowercase();
		if (upper) finalPassword += getRandomUppercase();
		if (numbers) finalPassword += getRandomNumber();
		if (symbols) finalPassword += getRandomSymbol();
	}
	return finalPassword.slice(0, lengthPassword);
}

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

printData(passwordLengthTxt, passwordRangeInput.value);
printData(
	passwordValueTxt,
	createPassword(
		lowercaseOptionInput.checked,
		uppercaseOptionInput.checked,
		numbersOptionInput.checked,
		symbolsOptionInput.checked,
		passwordRangeInput.value
	)
);

passwordRangeInput.addEventListener("change", () => {
	printData(passwordLengthTxt, passwordRangeInput.value);
});
generatePasswordBtn.addEventListener("click", (e) => {
	e.preventDefault();
	printData(
		passwordValueTxt,
		createPassword(
			lowercaseOptionInput.checked,
			uppercaseOptionInput.checked,
			numbersOptionInput.checked,
			symbolsOptionInput.checked,
			passwordRangeInput.value
		)
	);
});
