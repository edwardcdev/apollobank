import Joi from "@hapi/joi";

export const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).required(),
	dateOfBirth: Joi.date().max(new Date()).required(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).required(),
});

export const changePasswordSchema = Joi.object({
	oldPassword: Joi.string(),
	newPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6).required(),
});
