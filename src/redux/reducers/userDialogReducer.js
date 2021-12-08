import { SET_OPEN, GET_DRIVER, DELETE_DRIVER } from '../types'

const rows = [] //TMP!!!

const initialState = { userID: undefined, driverData: { ...rows[0] } }

export const userDialogReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_OPEN:
			return { userID: action.id, driverData: {} }

		case GET_DRIVER:
			return { ...state, driverData: action.driverData }

		case DELETE_DRIVER:
			return initialState

		default:
			return state
	}
}
