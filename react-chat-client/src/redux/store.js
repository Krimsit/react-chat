import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import rootReducer from "./reducers"

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const midleware = [thunk]

const store = createStore(
    rootReducer,
    composeEnchancers(applyMiddleware(...midleware))
)

export default store
