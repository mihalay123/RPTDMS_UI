import axios from 'axios'
import { adress } from '../constants/adress'

export const get_driver = (_id, token) => {
	return axios.get(`${adress}/driver`, {
		params: {
			token,
			_id,
		},
	})
}

export const delete_driver = (_id, token) => {
	return axios.delete(`${adress}/driver`, {
		params: {
			token,
			_id,
		},
	})
}

export const post_driver = (updatedData, _id, token) => {
	return axios.post(`${adress}/driver`, null, {
		params: {
			_id,
			token,
			...updatedData,
			status: updatedData?.status?.id,
		},
	})
}
