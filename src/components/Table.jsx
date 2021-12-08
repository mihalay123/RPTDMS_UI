import React, { useState, useEffect } from 'react'
import {
	TableContainer,
	Table as TableMUI,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	TableFooter,
	TablePagination,
} from '@material-ui/core'
import TablePaginationActions from './TablePaginationActions'
import { connect } from 'react-redux'
import TableCellContent from './TableCellContent'
import { getTable } from '../redux/actions/tableActions'
import { setOpenDialog } from '../redux/actions/userDialogActions'
import { tableColumns } from '../constants/table'
import { labels } from '../constants/label'

const Table = ({ setOpenDialog, getTable, data, count, user, driverData }) => {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	useEffect(() => {
		getTable({
			page,
			rows: rowsPerPage,
			sort_by: 'name',
			sort_direction: 'asc',
		})
	}, [page, rowsPerPage, driverData])

	const columns = tableColumns[user.role]

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage)

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const handleOpenDialog = (id) => {
		setOpenDialog(id)
	}

	return (
		<TableContainer component={Paper}>
			<TableMUI className="table">
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell>{labels[column]}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((driver) => (
						<TableRow
							hover
							key={driver.id}
							onClick={() => handleOpenDialog(driver._id)}
						>
							{columns.map((column) => (
								<TableCell>
									<TableCellContent headName={column} value={driver[column]} />
								</TableCell>
							))}
						</TableRow>
					))}

					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={4} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: count }]}
						count={count}
						rowsPerPage={rowsPerPage}
						page={page}
						labelDisplayedRows={({ from, to, count }) =>
							`${from}-${to} из ${count}`
						}
						labelRowsPerPage="Строк на странице:"
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					></TablePagination>
				</TableFooter>
			</TableMUI>
		</TableContainer>
	)
}

const mapStateToProps = (state) => ({
	data: state.table.data,
	count: state.table.count,
	user: state.authorization.user,
	driverData: state.userDialog.driverData,
})
const mapDispatchToProps = { setOpenDialog, getTable }
export default connect(mapStateToProps, mapDispatchToProps)(Table)
