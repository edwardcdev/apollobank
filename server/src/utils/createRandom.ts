export const createRandomNumber = (n: number): string => {
	let add = 1,
		max = 12 - add;

	if (n > max) {
		return createRandomNumber(max) + createRandomNumber(n - max);
	}

	max = Math.pow(10, n + add);
	let min = max / 10;
	let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return ("" + randomNumber).substring(add);
};

export const createRandomIbanCode = (): string => {
	return `GB${createRandomNumber(2)} AP0L ${createRandomNumber(4)} ${createRandomNumber(
		4
	)} ${createRandomNumber(4)} ${createRandomNumber(2)}`;
};

export const createRandomBicCode = (): string => {
	return `AP0LGB${createRandomNumber(2)}`;
};

export const createRandomSortCode = (): string | undefined => {
	let randomNumber = Math.floor(Math.random() * 899999 + 100000);
	return randomNumber
		.toString()
		.match(/.{1,2}/g)
		?.join("-");
};

export const createRandomCardNumber = (): string => {
	return `${createRandomNumber(4)} ${createRandomNumber(4)} ${createRandomNumber(
		4
	)} ${createRandomNumber(4)}`;
};
