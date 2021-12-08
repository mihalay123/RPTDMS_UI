import { LOGIN, LOGOUT, SIGNUP } from '../types'

const initialState = {
	user: {},
}

export const authorizationReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return { ...state, user: action.user }

		case LOGOUT:
			return initialState

		case SIGNUP:
			return initialState

		default:
			return state
	}
}
