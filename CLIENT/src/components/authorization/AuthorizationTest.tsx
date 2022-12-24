import { FormEventHandler, MouseEvent, useState } from 'react'
import s from './Authorization.module.scss'
import { useAppDispatch } from '../../hooks/reactReduxHooks'
import { registrationThunkCreator, loginThunkCreator } from '../../store/slices/apiActions/userActions'

// import Btn1 from '../elements/btn/Btn1'
// import Error from '../elements/error/Error'
import CastomInput from '../elements/inputs/CastomInput'
import PrimaryInpyt from '../elements/inputs/primaryInput/PrimaryInpyt'

type LoginFormFields = {
	email: string
	password: string
	checkPassword: string
	name?: string
	surname?: string
}

type FormFields = {
	email: HTMLInputElement
	password: HTMLInputElement
	checkPassword: HTMLInputElement
	name?: HTMLInputElement
	surname?: HTMLInputElement
}

type SybmitType = (form: LoginFormFields) => void

const AuthorizationTest = () => {
	const dispatch = useAppDispatch()

	const [registration, setRegistration] = useState(false)
	const [checked, setChecked] = useState(false)

	const onSubmit: SybmitType = async (form) => {
		const { email, password, name, surname } = form

		registration
			? name && surname && dispatch(registrationThunkCreator(email, password, name, surname))
			: dispatch(loginThunkCreator(email, password))
	}

	const changeForm = (e: MouseEvent<HTMLSpanElement>) => {
		setRegistration(!registration)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement & FormFields> = (e) => {
		e.preventDefault()

		const form = e.currentTarget
		const { email, password, checkPassword, name, surname } = form

		password.value !== checkPassword.value
			? alert('Проверьте пароль')
			: onSubmit({
				email: email.value,
				password: password.value,
				checkPassword: checkPassword.value,
				name: name?.value,
				surname: surname?.value,
			})
	}

	return (
		<div className={s.auth}>
			<div className={s.leftBox}>
				<h1>V _ Comnate</h1>
				<p>This is social-media project for traning</p>
			</div>

			<p>
				{registration ? 'You have profile?' : 'Make new profile?'}
				<span onClick={e => changeForm(e)}>
					{registration ? 'Login' : 'Registration'}
				</span>
			</p>

			<form onSubmit={handleSubmit}>
				<label>
					<span>Email</span>
					<PrimaryInpyt
						name='email'
						type='email'
						required
					/>
				</label>

				<label>
					<span>Password</span>
					<PrimaryInpyt
						name='password'
						type={checked ? 'text' : 'password'}
						minLength={3}
						maxLength={8}
						required
						autoComplete='off'
					/>
				</label>

				<label>
					<span>Repeat Password</span>
					<PrimaryInpyt
						name='checkPassword'
						type={checked ? 'text' : 'password'}
						required
						autoComplete='off'
					/>
				</label>

				<label>
					<span>Show Password</span>
					<input
						type='checkbox'
						checked={checked}
						onChange={() => setChecked(!checked)}
					/>
				</label>

				{registration &&
					<>
						<label>
							<span>Name</span>
							<PrimaryInpyt
								name='name'
								type='text'
								placeholder='Enter your Name'
							/>
						</label>

						<label>
							<span>Surname</span>
							<PrimaryInpyt
								name='surname'
								type='text'
								placeholder='Enter your Surname'
							/>
						</label>
					</>}
				<button type='submit'>
					{registration ? 'Registration' : 'Login'}
				</button>
			</form>

			{/* <Btn1
					text={registration ? 'Registration' : 'Login'}
					cnanging={true}
					onClick={() => submit()}
				/> */}
		</div>
	)
}

export default AuthorizationTest