import * as yup from 'yup'

export const authorizationSchema = yup.object().shape({
    login: yup.string()
        .required('Введите логин'),
    password: yup.string()
        .required('Введите пароль')
        .min(8, "Пароль должен содержать минимум 8 символов")
        .matches(/[a-zA-Z]/,
            "Пароль должен содержать буквы(латиница)")
})

export const registrationSchema = yup.object().shape({
    login: yup.string()
        .required('Введите логин'),
    firstname: yup.string()
        .required('Введите имя'),
    lastname: yup.string()
        .required('Введите фамилию'),
    password: yup.string()
        .required('Введите пароль')
        .min(8, "Пароль должен содержать минимум 8 символов")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z].*$/,
            "Пароль должен содержать буквы(латиница) и цифры")
})

export const createUserSchema = yup.object().shape({
    login: yup.string()
        .required('Введите логин'),
    firstname: yup.string()
        .required('Введите имя'),
    lastname: yup.string()
        .required('Введите фамилию'),
    password: yup.string()
        .required('Введите пароль')
        .min(8, "Пароль должен содержать минимум 8 символов")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z].*$/,
            "Пароль должен содержать буквы(латиница) и цифры")
})

export const editUserSchema = yup.object().shape({
    login: yup.string()
        .required('Введите логин'),
    firstname: yup.string()
        .required('Введите имя'),
    lastname: yup.string()
        .required('Введите фамилию'),
    password: yup.string()
        .required('Введите пароль')
        .min(8, "Пароль должен содержать минимум 8 символов")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z].*$/,
            "Пароль должен содержать буквы(латиница) и цифры")
})
