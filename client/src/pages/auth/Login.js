import React, { useCallback, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UserLogin, UserRegister } from 'apiServices/auth'
import { AuthContext } from 'context/authContext';

const LOGIN_DETAILS = {
	email: '',
	password: ''
}

const REGISTER_DETAILS = {
	username: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const Login = () => {

	const { dispatch } = useContext(AuthContext)
	const [loginDetails, setLoginDetails] = useState(Object.assign({}, LOGIN_DETAILS))
	const [registerDetails, setRegisterDetails] = useState(Object.assign({}, REGISTER_DETAILS))

	const handleSubmitLogin = useCallback(async(event) => {
		event.preventDefault()
		try {
			const authUser = await UserLogin(loginDetails)
			toast.success(authUser.msg)
			dispatch({
				type: 'LOG_IN_USER',
				payload: authUser
			})
		} catch (error) {
			toast.error(error.response.data.msg)
		}
	}, [loginDetails, dispatch])

	const handleSubmitRegister = useCallback(async(event) => {
		event.preventDefault()
		const filterData = ({ confirmPassword, ...rest }) => rest
		const payload = filterData(registerDetails)
		try {
			const registerUser = await UserRegister(payload)
			toast.success(registerUser.msg)
 		} catch (error) {
			toast.error(error.response.data.msg)
		} 
	}, [registerDetails])

	const handleChangeLoginDetails = useCallback((event) => {
		event.preventDefault()
		const updatedDetails = Object.assign({}, loginDetails)
		updatedDetails[event.target.id] = event.target.value
    	setLoginDetails(updatedDetails)
	}, [loginDetails])

	const handleChangeRegisterDetails = useCallback((event) => {
		event.preventDefault()
		const updatedDetails = Object.assign({}, registerDetails)
		updatedDetails[event.target.id] = event.target.value
    	setRegisterDetails(updatedDetails)
	}, [registerDetails])

  return (
	<div className="auth_wrapper">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div className="signup">
				<form onSubmit={handleSubmitRegister}>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" id="username" placeholder="User name" required value={registerDetails.username} onChange={handleChangeRegisterDetails} />
					<input type="email" name="email" id="email" placeholder="Email" required value={registerDetails.email} onChange={handleChangeRegisterDetails} />
					<input type="password" name="pswd" id="password" placeholder="Password" required value={registerDetails.password} onChange={handleChangeRegisterDetails} />
					<input type="password" name="pswd1" id="confirmPassword" placeholder="Confirm Password" required value={registerDetails.confirmPassword} onChange={handleChangeRegisterDetails} />
					<button type='submit'>Sign up</button>
				</form>
			</div>

			<div className="login">
				<form onSubmit={handleSubmitLogin}>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" id="email" placeholder="Email" required value={loginDetails.email} onChange={handleChangeLoginDetails} />
					<input type="password" name="pswd" id="password" placeholder="Password" required value={loginDetails.password} onChange={handleChangeLoginDetails} />
					<div className='forgot_user_link'>
						<Link to='/forgotPassword'>Forgot Password?</Link>
					</div>
					<button type='submit'>Login</button>
				</form>
			</div>
	</div>
  )
}

export default Login