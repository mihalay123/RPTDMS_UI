import React, { useEffect, useState } from 'react'
import {
	Dialog,
	Grid,
	Button,
	DialogContent,
	DialogTitle,
	DialogActions,
	Avatar,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
} from '@material-ui/core'
import {
	setOpenDialog,
	getDriver,
	deleteDriver,
	updateDriver,
} from '../redux/actions/userDialogActions'
import Plot from 'react-plotly.js'
import { connect } from 'react-redux'
import { labels, statuses } from '../constants/label'

const UserDialog = ({
	userID,
	user,
	setOpenDialog,
	driverData,
	getDriver,
	deleteDriver,
	updateDriver,
}) => {
	const [isDeletePressed, setDeletePressed] = useState(false)
	const [readOnly, setReadOnly] = useState(true)
	const [updatedData, setUpdatedData] = useState({})
	const delay = 300

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (userID !== undefined) {
			getDriver(userID, token)
		}
	}, [userID])

	const onCloseButton = () => {
		setOpenDialog(undefined)
		setReadOnly(true)
		setUpdatedData({})
	}

	const onDeleteButton = () => {
		setTimeout(() => setDeletePressed(true), delay)
	}

	const onConfirmButton = () => {
		setTimeout(() => {
			deleteDriver(userID)
			setDeletePressed(false)
		}, delay)
	}

	const onNotConfirmButton = () => {
		setTimeout(() => {
			setDeletePressed(false)
		}, delay)
	}

	const onEditButton = () => {
		setTimeout(() => {
			setUpdatedData({})
			setReadOnly(!readOnly)
		}, delay)
	}

	const onSaveButton = () => {
		updateDriver(userID, updatedData)
		setReadOnly(true)
	}

	const handleFields = (event, id) => {
		setUpdatedData({ ...updatedData, [id]: event.target.value })
	}

	const handleStatusField = (event) => {
		setUpdatedData({
			...updatedData,
			status: { id: event.target.value, desc: statuses[event.target.value] },
		})
	}

	return (
		<>
			{Object.keys(driverData).length !== 0 && (
				<Dialog
					open={userID !== undefined}
					keepMounted
					onClose={onCloseButton}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle>
						<Grid container spacing={3}>
							<Grid item>Подробная информация</Grid>
							<Grid item>
								<Button variant="outlined" onClick={onEditButton}>
									{readOnly ? 'Изменить' : 'Отменить'}
								</Button>
							</Grid>
							<Grid item>
								{!readOnly ? (
									<Button variant="outlined" onClick={onSaveButton}>
										Сохранить
									</Button>
								) : (
									<div></div>
								)}
							</Grid>
						</Grid>
					</DialogTitle>
					<DialogContent className="grid_content">
						<Grid
							container
							direction="row"
							justify="space-around"
							alignItems="center"
							spacing={3}
						>
							{user.role === 'dispatcher' && (
								<Grid item>
									<Avatar
										alt="photo"
										src={driverData.photo}
										style={{ width: '100px', height: '100px' }}
									></Avatar>
								</Grid>
							)}
						</Grid>

						<Grid
							container
							direction="column"
							justify="space-around"
							alignItems="center"
							spacing={3}
						>
							{user.role === 'dispatcher' && (
								<Grid
									container
									item
									direction="row"
									justify="space-around"
									alignItems="center"
									className="grid_row"
									spacing={3}
								>
									<Grid item className="grid_item">
										<TextField
											className="field"
											label={labels['name']}
											inputProps={{
												readOnly: !(user.role === 'dispatcher' && !readOnly),
											}}
											variant="outlined"
											color={readOnly ? 'primary' : 'secondary'}
											value={updatedData.name || driverData.name}
											onChange={(event) => handleFields(event, 'name')}
										/>
									</Grid>
									<Grid item className="grid_item">
										<TextField
											className="field"
											label={labels['surname']}
											inputProps={{
												readOnly: !(user.role === 'dispatcher' && !readOnly),
											}}
											color={readOnly ? 'primary' : 'secondary'}
											variant="outlined"
											value={updatedData.surname || driverData.surname}
											onChange={(event) => handleFields(event, 'surname')}
										/>
									</Grid>
								</Grid>
							)}
							{user.role === 'dispatcher' && (
								<Grid
									container
									item
									direction="row"
									justify="space-around"
									alignItems="center"
									className="grid_row"
									spacing={3}
								>
									<Grid item className="grid_item">
										<TextField
											className="field"
											label={labels['bus_id']}
											inputProps={{
												readOnly: !(user.role === 'dispatcher' && !readOnly),
											}}
											variant="outlined"
											color={readOnly ? 'primary' : 'secondary'}
											value={updatedData.bus_id || driverData.bus_id}
											onChange={(event) => handleFields(event, 'bus_id')}
										/>
									</Grid>
									<Grid item className="grid_item">
										<TextField
											className="field"
											label={labels['email']}
											inputProps={{
												readOnly: !(user.role === 'dispatcher' && !readOnly),
											}}
											variant="outlined"
											color={readOnly ? 'primary' : 'secondary'}
											value={updatedData.email || driverData.email}
											onChange={(event) => handleFields(event, 'bus_id')}
										/>
									</Grid>
								</Grid>
							)}
							<Grid
								container
								item
								direction="row"
								justify="space-around"
								alignItems="center"
								className="grid_row"
								spacing={3}
							>
								<Grid item className="grid_item">
									<TextField
										className="field"
										label={labels['medic_recomendation']}
										inputProps={{
											readOnly: !(user.role === 'medic' && !readOnly),
										}}
										variant="outlined"
										color={
											!(user.role === 'medic' && !readOnly)
												? 'primary'
												: 'secondary'
										}
										value={
											updatedData.medic_recomendation ||
											driverData.medic_recomendation
										}
										onChange={(event) =>
											handleFields(event, 'medic_recomendation')
										}
									/>
								</Grid>
								<Grid item className="grid_item">
									{/* Статус: {driverData.status?.desc} */}
									<FormControl
										variant="outlined"
										disabled={!(user.role === 'dispatcher' && !readOnly)}
										className="field"
									>
										<InputLabel id="outlined-label">Статус</InputLabel>
										<Select
											label={labels['status']}
											labelId="outlined-label"
											value={updatedData.status?.id || driverData.status?.id}
											onChange={(event) => handleStatusField(event)}
										>
											<MenuItem value={0}>{statuses[0]}</MenuItem>
											<MenuItem value={1}>{statuses[1]}</MenuItem>
											<MenuItem value={2}>{statuses[2]}</MenuItem>
											<MenuItem value={3}>{statuses[3]}</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							container
							direction="row"
							justify="space-around"
							alignItems="center"
							spacing={3}
							className="grid_plots_row"
						>
							<Grid item>
								<Plot
									data={[
										{
											type: 'scatter',
											mode: 'lines+markers',
											x: driverData.pulse.map((pulseObj) => pulseObj.time),
											y: driverData.pulse.map((pulseObj) => pulseObj.pulse),
											marker: { color: 'red' },
										},
									]}
									layout={{ width: 400, height: 300, title: labels['pulse'] }}
								/>
							</Grid>
							<Grid item>
								<Plot
									data={[
										{
											type: 'scatter',
											mode: 'lines+markers',
											x: driverData.temperature.map(
												(temperatureObj) => temperatureObj.time
											),
											y: driverData.temperature.map(
												(temperatureObj) => temperatureObj.temperature
											),
											marker: { color: 'red' },
										},
									]}
									layout={{
										width: 400,
										height: 300,
										title: labels['temperature'],
									}}
								/>
							</Grid>
						</Grid>
						{user.role === 'dispatcher' && (
							<Grid
								container
								direction="column"
								justify="space-around"
								alignItems="center"
								spacing={3}
								className="grid_location_row"
							>
								<Grid item>
									<Typography variant="body1">{labels['location']}</Typography>
								</Grid>
								<Grid item>
									<iframe
										src={driverData.location}
										width="890"
										height="300"
										frameBorder="0"
										style={{ border: 0 }}
										allowFullScreen=""
										aria-hidden="false"
										tabIndex="0"
									/>
								</Grid>
							</Grid>
						)}
						<Grid
							container
							direction="row"
							justify="space-around"
							alignItems="flex-end"
							spacing={3}
							className="delete_button_container"
						>
							{!isDeletePressed ? (
								<Grid item>
									<Button
										onClick={onDeleteButton}
										variant="contained"
										color="secondary"
									>
										Удалить Водителя
									</Button>
								</Grid>
							) : (
								<Grid item>
									<p>Вы уверены?</p>
									<Button
										onClick={onConfirmButton}
										variant="contained"
										color="secondary"
									>
										Да
									</Button>
									<Button
										onClick={onNotConfirmButton}
										variant="contained"
										color="secondary"
									>
										Нет
									</Button>
								</Grid>
							)}
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={onCloseButton} variant="contained" color="primary">
							Закрыть
						</Button>
					</DialogActions>
				</Dialog>
			)}{' '}
		</>
	)
}

const mapStateToProps = (state) => ({
	userID: state.userDialog.userID,
	driverData: state.userDialog.driverData,
	user: state.authorization.user,
})
const mapDispatchToProps = {
	setOpenDialog,
	getDriver,
	deleteDriver,
	updateDriver,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog)
