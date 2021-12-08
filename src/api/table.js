import axios from 'axios'
import { adress } from '../constants/adress'

export const get_table = ({ page, rows, sort_by, sort_direction, token }) => {
	return axios.get(`${adress}/table`, {
		params: {
			token,
			page: page + 1,
			rows,
			sort_by,
			sort_direction,
		},
	})
}
