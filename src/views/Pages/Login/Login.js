import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginService } from '../../../services'
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { constant } from '../../../utils/Constant';
import { decodeJWT } from '../../../utils/DecodeJWT';

const errMsg401 = 'Username and password combination is incorrect.';
const errMsgRequired = 'Username and password are required.';
class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errMessage: null,
			showPassword: false,
		}
	}

	handleChange(event) {
		let currentUser = this.state.user;
		currentUser[[event.target.id]] = event.target.value;
		this.setState({
			user: currentUser
		});
	}

	login(values) {
		if (values.userName.trim() === '' || values.password.trim() === '') {
			this.setState({
				errMessage: errMsgRequired
			})
		} else {
			loginService.loginAdmin(values).then(data => {
				if (data.errorCode !== 0) {
					let errMsg = data.errorCode
					if (data.errorCode === 401) {
						errMsg = errMsg401
					}
					this.setState({
						errMessage: errMsg
					})

				} else {
					localStorage[constant.TOKEN_VARIABLE_NAME] = data.data;
					if (decodeJWT.decodeToken(data.data).role === constant.ROLE_ADMIN) {
						this.props.history.push('/admin')
					} else {
						this.setState({
							errMessage: errMsg401
						})
					}
				}
			})
				.catch(err => {
					console.error(err);
					this.setState({ errMessage: err.message });
				});
		}
	}

	// goBack = () => {
	// 	this.props.history.goBack();
	// }

	goBack = () => {
		this.props.history.push(constant.ROUTE_HOME);
	}

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	getValidationSchema = () => {
		return Yup.object().shape({
			userName: Yup.string()
				.required(),
			password: Yup.string()
				.required()
		});
	}

	validate = values => {
		this.setState({
			errMessage: null
		})
	}
	render() {
		return (
			<div className="app flex-row align-items-center login-background">
				<div className="login-content">
					<button className="login-button-icon" onClick={this.goBack}><i className="fa icon-login-admin-custom icon-foot"></i></button>
					<label className="login-label">LOGIN ADMIN</label>
					<div className="login-card">
						<Formik
							initialValues={{
								userName: '',
								password: '',
							}}
							validationSchema={this.getValidationSchema}
							validate={this.validate}
							onSubmit={(values, { setSubmitting }) => {
								this.login(values, setSubmitting)
							}}
						>
							{props => (
								<div style={{ marginTop: '22px' }}>
									{
										this.state.errMessage !== null &&
										<label className="login-err-message">{this.state.errMessage}</label>
									}
									<Form>
										<div className="login-group">
											<TextField
												id="userName"
												label="Username"
												className="login-input"
												type="text"
												name="userName"
												autoComplete="text"
												margin="normal"
												variant="outlined"
												value={props.userName}
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												error={(props.errors.userName && props.touched.userName) ? true : false}
											/>
										</div>
										<div className="login-group">
											<TextField
												id="password"
												label="Password"
												className="login-input"
												type={this.state.showPassword ? 'text' : 'password'}
												name="password"
												autoComplete="text"
												margin="normal"
												variant="outlined"
												value={props.password}
												onChange={props.handleChange}
												onBlur={props.handleBlur}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="Toggle password visibility"
																onClick={this.handleClickShowPassword}
															>
																{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
															</IconButton>
														</InputAdornment>
													),
												}}
												error={(props.errors.password && props.touched.password) ? true : false}
											/>
										</div>
										<button type="submit" className="login-admin-button">LOGIN</button>
									</Form>
									<Link to="/forgotPassword" className="login-forgot-pass">Forgot password?</Link>
								</div>
							)}
						</Formik>
					</div>
					<button className="login-go-back" onClick={this.goBack}><i className="fa icon-check-custom icon-back"></i><span className="login-go-back-text">BACK TO HOME</span></button>
				</div>
			</div>
		);
	}
}

export default Login;
