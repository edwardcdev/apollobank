import * as yup from 'yup';

export const changePasswordValidationSchema = yup.object({
    oldPassword: yup.string(),
    newPassword: yup.lazy(value =>
        !value ? yup.string() : yup.string().min(6, 'Password must be at least 6 characters'),
    ),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});
