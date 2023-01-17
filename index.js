const checkboxes = document.querySelectorAll(".password-generator__input-checkbox");

const passwordRangeInput = document.getElementById("passwordRangeInput");
const lowercaseOptionInput = document.getElementById("lowercaseOptionInput");
const uppercaseOptionInput = document.getElementById("uppercaseOptionInput");
const numbersOptionInput = document.getElementById("numbersOptionInput");
const symbolsOptionInput = document.getElementById("symbolsOptionInput");

const passwordLengthTxt = document.getElementById("passwordLengthTxt");
const passwordValueTxt = document.getElementById("passwordValueTxt");
const passwordStrengthTxt = document.getElementById("passwordStrengthTxt");

const generatePasswordBtn = document.getElementById("generatePasswordBtn");
const copyPasswordBtn = document.getElementById("copyPasswordBtn");

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

function checkStrength(text) {
	// all package will be available under zxcvbnts
	const options = {
		translations: zxcvbnts["language-en"].translations,
		graphs: zxcvbnts["language-common"].adjacencyGraphs,
		dictionary: {
			...zxcvbnts["language-common"].dictionary,
			...zxcvbnts["language-en"].dictionary,
		},
	};
	zxcvbnts.core.zxcvbnOptions.setOptions(options);
	let score = zxcvbnts.core.zxcvbn(text).score;

	if (score === 0) {
		passwordStrengthTxt.style.color = "#8794D9";
		return "Muy fácil";
	}
	if (score === 1) {
		passwordStrengthTxt.style.color = "#87D9D4";
		return "Fácil";
	}
	if (score === 2) {
		passwordStrengthTxt.style.color = "#8CD987";
		return "Normal";
	}
	if (score === 3) {
		passwordStrengthTxt.style.color = "#D9C287";
		return "Díficil";
	}
	if (score === 4) {
		passwordStrengthTxt.style.color = "#D98787";
		return "Muy difícil";
	}
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
printData(passwordStrengthTxt, checkStrength(passwordValueTxt.textContent));

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
	printData(passwordStrengthTxt, checkStrength(passwordValueTxt.textContent));
});

copyPasswordBtn.addEventListener("click", () => {
	navigator.clipboard.writeText(passwordValueTxt.textContent);
	alert(`Contraseña copiado: ${passwordValueTxt.textContent}`);
});
