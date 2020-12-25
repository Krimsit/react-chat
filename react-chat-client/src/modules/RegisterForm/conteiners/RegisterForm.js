import { withFormik } from "formik"

import validateForm from "utils/validate"
import { userActions } from "redux/actions"
import store from "redux/store"

import RegisterForm from "../components/RegisterForm"

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        fullname: "",
        password: "",
        password_2: "",
    }),
    validate: (values) => {
        let errors = {}

        validateForm({ isAuth: false, values, errors })

        return errors
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        store
            .dispatch(userActions.fetchUserRegister(values))
            .then(({ status }) => {
                if (status === "success") {
                    setTimeout(() => {
                        props.history.push("/")
                    }, 100)
                }
                setSubmitting(false)
            })
            .catch(() => {
                setSubmitting(true)
            })
    },
    displayName: "RegisterForm",
})(RegisterForm)
