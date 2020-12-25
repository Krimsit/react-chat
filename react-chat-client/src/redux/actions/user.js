import { userApi } from "utils/api"
import { openNotification } from "utils/helpers"

const actions = {
    setUserData: (data) => ({
        type: "USER:SET_DATA",
        payload: data,
    }),
    setIsAuth: (bool) => ({
        type: "USER:SET_IS_AUTH",
        payload: bool,
    }),
    fetchUserData: () => (dispatch) => {
        userApi
            .getMe()
            .then(({ data }) => {
                dispatch(actions.setUserData(data))
            })
            .catch(({ response }) => {
                if (response.status === 403) {
                    dispatch(actions.setIsAuth(false))
                    delete window.localStorage.token
                }
            })
    },
    fetchUserLogin: (postData) => (dispatch) => {
        return userApi
            .signin(postData)
            .then(({ data }) => {
                const { token } = data
                openNotification({
                    text: "Вы вошли в свой аккаунт",
                    type: "success",
                    title: "Авторизация прошла успешно",
                })
                window.axios.defaults.headers.common["token"] = token
                window.localStorage["token"] = token
                dispatch(actions.fetchUserData())
                dispatch(actions.setIsAuth(true))
                return data
            })
            .catch(({ response }) => {
                if (response.status === 403) {
                    openNotification({
                        text: "Вы вошли в свой аккаунт",
                        type: "success",
                        title: "Авторизация прошла успешно",
                    })
                }
            })
    },
    fetchUserRegister: (postData) => (dispatch) => {
        return userApi.signup(postData).then(({ data }) => {
            return data
        })
    },
}

export default actions
