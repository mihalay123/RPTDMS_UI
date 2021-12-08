import { Chip } from '@material-ui/core'
import React from 'react'
import { Warning, Error, Done } from '@material-ui/icons/'

const TableCellContent = ({ headName, value }) => {
	const getContent = (headName, value) => {
		if (value === undefined) return ''
		switch (headName) {
			case 'status':
				return value.desc

			case 'pulse':
				if (value.pulse < 90) {
					const icon = <Done />
					return <Chip label={value.pulse} icon={icon} className="good_chip" />
				} else if (value.pulse < 110) {
					const icon = <Warning />
					return (
						<Chip label={value.pulse} icon={icon} className="warning_chip" />
					)
				} else {
					const icon = <Error />
					return <Chip label={value.pulse} icon={icon} className="error_chip" />
				}

			case 'temperature':
				if (value.temperature < 37) {
					const icon = <Done />
					return (
						<Chip label={value.temperature} icon={icon} className="good_chip" />
					)
				} else if (value.temperature < 38) {
					const icon = <Warning />
					return (
						<Chip
							label={value.temperature}
							icon={icon}
							className="warning_chip"
						/>
					)
				} else {
					const icon = <Error />
					return (
						<Chip
							label={value.temperature}
							icon={icon}
							className="error_chip"
						/>
					)
				}

			default:
				return value
		}
	}

	return <>{getContent(headName, value)}</>
}

export default TableCellContent
