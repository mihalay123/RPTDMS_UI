import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {
	authorizationReducer,
	userDialogReducer,
	tableReducer,
} from './reducers'

const reducers = combineReducers({
	authorization: authorizationReducer,
	userDialog: userDialogReducer,
	table: tableReducer,
})
const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store
