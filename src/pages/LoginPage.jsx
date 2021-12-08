import React, { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { SIGNUP_PATH } from '../constants/paths'
import { login } from '../redux/actions/authorizationActions'
import { connect } from 'react-redux'

const LoginPage = ({ login }) => {
	const [fields, setFields] = useState({})
	const history = useHistory()

	const handleFields = (event, id) => {
		setFields({ ...fields, [id]: event.target.value })
	}

	const onLoginButton = () => {
		login({ email, password })
	}

	const redirectToSignup = () => {
		history.push(SIGNUP_PATH)
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			onLoginButton()
		}
	}

	const { email, password } = fields

	return (
		<div>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				spacing={1}
			>
				<Grid item>
					<Typography variant="h4" className="page_header">
						Авторизация
					</Typography>
				</Grid>
				<Grid
					container
					item
					direction="row"
					justify="center"
					alignItems="center"
					spacing={1}
					style={{ marginBottom: '10px' }}
				>
					<Grid item>
						<TextField
							label="email"
							variant="outlined"
							type="email"
							onChange={(event) => handleFields(event, 'email')}
							value={email}
							onKeyPress={handleKeyPress}
						></TextField>
					</Grid>
					<Grid item>
						<TextField
							label="password"
							variant="outlined"
							type="password"
							onChange={(event) => handleFields(event, 'password')}
							value={password}
							onKeyPress={handleKeyPress}
						></TextField>
					</Grid>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={onLoginButton}
						disabled={!password || !login}
					>
						Авторизация
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="secondary"
						fullWidth
						onClick={redirectToSignup}
					>
						Регистрация
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

const mapDispatchToProps = { login }
export default connect(null, mapDispatchToProps)(LoginPage)
