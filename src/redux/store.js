import { createStore } from "redux"
import { playlist } from "./reducers"

const store = createStore(playlist)

export default store
