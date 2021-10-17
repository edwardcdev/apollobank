import * as yup from 'yup';

export const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email()
        .required('Email is required'),
    password: yup.lazy(value =>
        !value
            ? yup.string()
            : yup
                  .string()
                  .min(6, 'Password must be at least 6 characters')
                  .required('Password is required'),
    ),
});
