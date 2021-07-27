import { createStore, combineReducers } from "redux"
import { playlist, fireEnemy } from "./reducers"

const store = createStore(combineReducers({playlist, fireEnemy}))

export default store
