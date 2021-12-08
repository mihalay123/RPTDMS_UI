import { SET_TABLE_DATA, SET_TABLE_COUNT } from '../types'
import { get_table } from '../../api'

export const getTable =
	({ page, rows, sort_by, sort_direction }) =>
	(dispatch) => {
		const token = localStorage.getItem('token')
		get_table({ page, rows, sort_by, sort_direction, token })
			.then((response) => {
				dispatch({ type: SET_TABLE_DATA, data: response.data.data })
				dispatch({ type: SET_TABLE_COUNT, count: response.data.count })
				return response
			})
			.catch((err) => alert(err))
	}
