import { Grid, Button, Typography } from '@material-ui/core'
import Table from '../components/Table'
import { connect } from 'react-redux'
import UserDialog from '../components/UserDialog'
import { logout } from '../redux/actions/authorizationActions'

const TablePage = ({ logout }) => {
	const handleLogoutBottom = () => {
		logout()
	}

	return (
		<div>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				spacing={3}
			>
				<Grid item>
					<Typography variant="h4" className="page_header">
						Таблица водителей
					</Typography>
				</Grid>
			</Grid>
			<Table />
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				spacing={3}
			>
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						onClick={handleLogoutBottom}
						style={{ marginTop: '30px' }}
					>
						Выход из сессии
					</Button>
				</Grid>
			</Grid>
			<UserDialog />
		</div>
	)
}

const mapDispatchToProps = { logout }

export default connect(null, mapDispatchToProps)(TablePage)
