import { LOGIN, LOGOUT } from '../types'
import {
	login as login_api,
	logout as logout_api,
	signup as signup_api,
} from '../../api'
import crypto from 'crypto'

export const login =
	({ email, password }) =>
	(dispatch) => {
		const hashPassword = crypto
			.createHash('sha256')
			.update(password, 'utf-8')
			.digest('hex')
		return login_api({ email, password: hashPassword })
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem('token', response.data.token)
					localStorage.setItem('email', email)
					localStorage.setItem('password', hashPassword)
					dispatch({ type: LOGIN, user: response.data })
					return response
				} else {
					throw new Error('Неправильное имя Пользователя или пароль')
				}
			})
			.catch((err) => alert(err))
	}

export const logout = () => (dispatch) => {
	return logout_api()
		.then((response) => {
			if (response.data === 'OK') {
				dispatch({ type: LOGOUT })
				localStorage.removeItem('token')
				localStorage.removeItem('email')
				localStorage.removeItem('password')
				return response
			}
		})
		.catch((err) => alert(err))
}

export const signup = (userInfo) => (dispatch) => {
	const hashPassword = crypto
		.createHash('sha256')
		.update(userInfo.password, 'utf-8')
		.digest('hex')
	return signup_api({
		...userInfo,
		password: hashPassword,
	})
		.then((response) => {
			if (response.data === 'OK') {
				return response
			} else {
				throw new Error('Некоректные данные')
			}
		})
		.catch((err) => alert(err))
}
