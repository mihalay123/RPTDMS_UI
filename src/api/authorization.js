import axios from 'axios'
import { adress } from '../constants/adress'

export const login = (userInfo) => {
	return axios.get(`${adress}/login`, {
		params: {
			...userInfo,
		},
	})
}

export const signup = ({ role, ...userInfo }) => {
	return axios.post(`${adress}/signup/${role}`, null, {
		params: {
			...userInfo,
		},
	})
}

export const logout = () => {
	return axios.get(`${adress}/logout`, {
		params: {
			token: localStorage.getItem('token'),
		},
	})
}
