export enum SuccessMessages {
	ADD_MONEY = "Successfully topped up your account.",
	EXCHANGE = "The exchange was successfully executed.",
}

export enum ErrorMessages {
	ADD_MONEY = "Failed to top up your account",
	EXCHANGE = "You do not have the sufficient funds to make this exchange.",
	LOGIN = "Invalid login.",
	PASSWORD = "Invalid password.",
	UPDATE_PASSWORD = "Could not change your password, are you sure you entered the correct password?",
	DELETE_ACCOUNT = "Failed to destroy account.",
	BALANCE_LESS_THAN = "Your account balance has fallen below 0. Please top up before deleting.",
	BALANCE_GREATER_THAN = "Your account balance is greater than 0. Please exchange your funds before deleting.",
}
