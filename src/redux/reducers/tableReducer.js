import { SET_TABLE_DATA, SET_TABLE_COUNT } from '../types'

const initialState = { count: 1, data: [] }

export const tableReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TABLE_DATA:
			return { ...state, data: action.data }

		case SET_TABLE_COUNT:
			return { ...state, count: action.count }

		default:
			return state
	}
}
