import * as yup from 'yup';

export const addMoneyValidationSchema = yup.object({
    amount: yup
        .number()
        .required()
        .positive('Amount must be a positive number')
        .integer(),
});
