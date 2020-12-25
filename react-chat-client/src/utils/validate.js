export default function validateForm({ isAuth, values, errors }) {
    const rules = {
        email: (errors, value) => {
            if (!value) {
                errors.email = "Введите E-mail"
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ) {
                errors.email = "Неверно введён E-mail"
            }
        },
        password: (errors, value) => {
            if (!value) {
                errors.password = "Введите пароль"
            } else if (
                !isAuth &&
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(value)
            ) {
                errors.password =
                    "Пароль должен содержать 8 символов среди которых минимум 1 заглавная буква, 1 прописная буква и 1 цифра"
            }
        },
        password_2: (errors, value) => {
            if (!isAuth && value !== values.password) {
                errors.password_2 = "Пароли не совпадают"
            }
        },
        fullname: (errors, value) => {
            if (!isAuth && !value) {
                errors.fullname = "Укажите своё имя"
            } else if (
                !isAuth &&
                !/^(?=.*[a-zA-Z0-9А-Яа-я])(?=.{6,})/i.test(value)
            ) {
                errors.fullname = "Имя должно содержать не менее 6 символов"
            }
        },
    }

    Object.keys(values).forEach(
        (key) => rules[key] && rules[key](errors, values[key])
    )
}
