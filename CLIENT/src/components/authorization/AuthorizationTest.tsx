import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/reactReduxHooks'
// @ts-ignore 
import s from './Authorization.module.css'

import { registrationThunkCreator, loginThunkCreator } from '../../store/slices/apiActions/userActions';
import Btn1 from '../elements/btn/Btn1'
// import Input from '../styleedComponents/Input';

const AuthorizationTest = () => {
	const [registration, setRegistration] = useState(false)
	const [values, setValues] = useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const inputs = [
		{
			id: 1,
			name: "username",
			type: "text",
			placeholder: "Username",
			errorMessage:
				"Username should be 3-16 characters and shouldn't include any special character!",
			// label: "Username",
			pattern: "^[A-Za-z0-9]{3,16}$",
			required: true,
		},
		{
			id: 2,
			name: "email",
			type: "email",
			placeholder: "Email",
			errorMessage: "It should be a valid email address!",
			// label: "Email",
			required: true,
		},
		// {
		//   id: 3,
		//   name: "birthday",
		//   type: "date",
		//   placeholder: "Birthday",
		//   label: "Birthday",
		// },
		{
			id: 3,
			name: "password",
			type: "password",
			placeholder: "Password",
			errorMessage:
				"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
			// label: "Password",
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
			required: true,
		},
		{
			id: 4,
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm Password",
			errorMessage: "Passwords don't match!",
			// label: "Confirm Password",
			pattern: values.password,
			required: true,
		},
	]

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const dispatch = useAppDispatch()

	const [checkPasword, setCheckPasword] = useState('')

	const click = async () => {
		console.log('clik)))');

		// 	password.value !== checkPasword
		// 		? alert('Проверьте пароль')
		// 		: registration
		// 			? dispatch(registrationThunkCreator(email.value, password.value, name, surname))
		// 			: dispatch(loginThunkCreator(email.value, password.value))
	}


	const [focused, setFocused] = useState(false)

	const handleFocus = () => setFocused(true)

	return (
		<div className={s.auth}>
			<h1>V _ Comnate <br /> <span>This is social-media project for traning</span></h1>

			<form onSubmit={handleSubmit}>
				<p>{registration ? 'You have profile?' : 'Make new profile?'}
					<span onClick={(e) => {
						e.preventDefault()
						setRegistration(!registration)
					}}>
						{registration ? 'Login' : 'Registration'}
					</span>
				</p>

				{
					inputs.map(input => (
						<>
							<input
								onChange={onChange}
								onBlur={handleFocus}
							// onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
							// focused={focused.toString()}
							/>
							{/* <span>{errorMessage}</span> */}
						</>
					))
				}



				{/* {registration && <>


					<div className={s.box}>

						<p>Name</p>

						<input
							onChange={e => setName(e.target.value)}
							// onBlur={e => password.onBlur(e)}
							value={name}
							type='text'
							placeholder='Enter your Name...'
						/>
					</div>
					<div className={s.box}>

						<p>Surname</p>

						<input
							onChange={e => setSurname(e.target.value)}
							// onBlur={e => password.onBlur(e)}
							value={surname}
							type='text'
							placeholder='Enter your surname...'
						/>
					</div>
				</>} */}

				<Btn1
					// disabled={!email.inputValid || !password.inputValid}
					text={registration ? 'Registration' : 'Login'}
					cnanging={true}
					onClick={() => click()}
				/>
			</form>
		</div>
	)
}

// export default AuthorizationTest
