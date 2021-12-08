import { SET_OPEN, GET_DRIVER, DELETE_DRIVER } from '../types'
import { get_driver, delete_driver, post_driver } from '../../api'

export const setOpenDialog = (id) => (dispatch) => {
	dispatch({ type: SET_OPEN, id })
}

export const getDriver = (id) => (dispatch) => {
	const token = localStorage.getItem('token')
	get_driver(id, token)
		.then((response) => {
			dispatch({ type: GET_DRIVER, driverData: response.data })
		})
		.catch((err) => alert(err))
}

export const deleteDriver = (id) => (dispatch) => {
	const token = localStorage.getItem('token')
	delete_driver(id, token)
		.then((response) => {
			dispatch({ type: DELETE_DRIVER })
		})
		.catch((err) => alert(err))
}

export const updateDriver = (id, updatedData) => (dispatch) => {
	const token = localStorage.getItem('token')
	post_driver(updatedData, id, token)
		.then((response) => {
			if (response.data === 'OK') getDriver(id)(dispatch)
		})
		.catch((err) => alert(err))
}
