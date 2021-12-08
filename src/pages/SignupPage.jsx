import React, { useState, useEffect } from 'react'
import {
	Button,
	Grid,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	Collapse,
	Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup } from '../redux/actions/authorizationActions'
import { LOGIN_PATH } from '../constants/paths'

const SignupPage = ({ signup }) => {
	const [fields, setFields] = useState({})
	const [isFieldsValid, setIsFieldsValid] = useState(false)
	const history = useHistory()
	const requiredFieldsOperator = [
		'email',
		'password',
		'secondPassword',
		'name',
		'surname',
		'role',
	]
	const requiredFieldsDriver = ['bus_id']

	useEffect(() => {
		const isOperatorValid = requiredFieldsOperator.every(
			(key) => fields[key] !== undefined && fields[key] !== ''
		)
		const isDriverValid =
			isOperatorValid &&
			requiredFieldsDriver.every(
				(key) => fields[key] !== undefined && fields[key] !== ''
			)
		if (
			((fields.role === 'dispatcher' && isOperatorValid) ||
				(fields.role === 'medic' && isOperatorValid) ||
				(fields.role === 'driver' && isDriverValid)) &&
			password === secondPassword
		) {
			setIsFieldsValid(true)
		} else {
			setIsFieldsValid(false)
		}
	}, [fields])

	const handleFields = (event, id) => {
		setFields({ ...fields, [id]: event.target.value })
	}

	const onSignupButton = () => {
		signup(fields)
			.then((response) => {
				history.push(LOGIN_PATH)
			})
			.catch((err) => alert(err))
	}

	const onLoginButton = () => {
		history.push(LOGIN_PATH)
	}

	const { email, password, secondPassword, name, surname, role, busID } = fields
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
						Регистрация
					</Typography>
				</Grid>
				<Grid
					container
					item
					direction="column"
					justify="center"
					alignItems="center"
					spacing={3}
					style={{ marginBottom: '10px' }}
				>
					<Grid item className="grid-item_input-field">
						<TextField
							label="Почта"
							variant="outlined"
							type="email"
							onChange={(event) => handleFields(event, 'email')}
							value={email}
							className="full-width"
						></TextField>
					</Grid>
					<Grid item className="grid-item_input-field">
						<TextField
							label="Пароль"
							variant="outlined"
							type="password"
							onChange={(event) => handleFields(event, 'password')}
							value={password}
							className="full-width"
						></TextField>
					</Grid>
					<Grid item className="grid-item_input-field">
						<TextField
							error={
								secondPassword !== undefined && password !== secondPassword
							}
							label="Повторите пароль"
							variant="outlined"
							type="password"
							onChange={(event) => handleFields(event, 'secondPassword')}
							value={secondPassword}
							className="full-width"
						></TextField>
					</Grid>
					<Grid item className="grid-item_input-field">
						<TextField
							label="Имя"
							variant="outlined"
							onChange={(event) => handleFields(event, 'name')}
							value={name}
							className="full-width"
						></TextField>
					</Grid>
					<Grid item className="grid-item_input-field">
						<TextField
							label="Фамилия"
							variant="outlined"
							onChange={(event) => handleFields(event, 'surname')}
							value={surname}
							className="full-width"
						></TextField>
					</Grid>
					<Grid item className="grid-item_input-field">
						<FormControl variant="outlined" className="full-width">
							<InputLabel id="outlined-label">Должность</InputLabel>
							<Select
								label="Должность"
								labelId="outlined-label"
								value={role}
								onChange={(event) => handleFields(event, 'role')}
							>
								<MenuItem value={'dispatcher'}>Диспетчер</MenuItem>
								<MenuItem value={'medic'}>Медицинский работник</MenuItem>
								<MenuItem value={'driver'}>Водитель</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item className="grid-item_input-field">
						<Collapse in={role === 'driver'} timeout={1000}>
							<TextField
								label="Номер ТС"
								variant="outlined"
								onChange={(event) => handleFields(event, 'bus_id')}
								value={busID}
								className="full-width"
							></TextField>
						</Collapse>
					</Grid>
				</Grid>
				<Grid item style={{ width: '20%' }}>
					<Button
						variant="contained"
						color="primary"
						disabled={!isFieldsValid}
						fullWidth
						onClick={onSignupButton}
					>
						Регистрация
					</Button>
				</Grid>
				<Grid item style={{ width: '20%' }}>
					<Button
						variant="contained"
						color="secondary"
						fullWidth
						onClick={onLoginButton}
					>
						Авторизация
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

const mapDispatchToProps = { signup }
export default connect(null, mapDispatchToProps)(SignupPage)
