import React from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import TablePage from './pages/TablePage'
import {
	LOGIN_PATH,
	SIGNUP_PATH,
	TABLE_PATH,
	ROOT_PATH,
} from './constants/paths'
import './assets/styles/App.css'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

function App({ user }) {
	return (
		<Router>
			<div>
				<Switch>
					<Route path={LOGIN_PATH}>
						{Object.keys(user).length === 0 ? (
							<LoginPage />
						) : (
							<Redirect to={TABLE_PATH}></Redirect>
						)}
					</Route>
					<Route path={SIGNUP_PATH}>
						{Object.keys(user).length === 0 ? (
							<SignupPage />
						) : (
							<Redirect to={TABLE_PATH}></Redirect>
						)}
					</Route>
					<Route path={TABLE_PATH}>
						{Object.keys(user).length === 0 ? ( //TMP!!!
							<Redirect to={LOGIN_PATH}></Redirect>
						) : (
							<TablePage />
						)}
					</Route>
					<Route path={ROOT_PATH}>
						{Object.keys(user).length === 0 ? (
							<Redirect to={LOGIN_PATH}></Redirect>
						) : (
							<Redirect to={TABLE_PATH}></Redirect>
						)}
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

const mapStateToProps = (state) => ({ user: state.authorization.user })
export default connect(mapStateToProps, null)(App)
