import { MouseEvent, useState } from 'react'
import s from './Authorization.module.scss'
import { useAppDispatch } from '../../hooks/reactReduxHooks'
import { errorEmail, errorPassword } from '../../hooks/useFormValidation'
import { useFormValidation } from '../../hooks/useFormValidation'
import { registrationThunkCreator, loginThunkCreator } from '../../store/slices/apiActions/userActions';

import Btn1 from '../elements/btn/Btn1'
import Error from '../elements/error/Error'

const Authorization = () => {
	const dispatch = useAppDispatch()
	const loginEmail = { isEmpty: true, minLength: 3, maxLength: 30, isEmail: true, }
	const loginPassword = { isEmpty: true, minLength: 8, maxLength: 16, isEmail: null }
	const email = useFormValidation('', loginEmail)
	const password = useFormValidation('', loginPassword)

	const [registration, setRegistration] = useState(false)
	const [checkPasword, setCheckPasword] = useState('')
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [checked, setChecked] = useState(false)

	const submit = async () => {
		password.value !== checkPasword
			? alert('Проверьте пароль')
			: registration
				? dispatch(registrationThunkCreator(email.value, password.value, name, surname))
				: dispatch(loginThunkCreator(email.value, password.value))
	}

	const changeForm = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault()
		setRegistration(!registration)
	}

	return (
		<div className={s.auth}>
			<div className={s.leftBox}>
				<h1>V _ Comnate</h1>
				<p>This is social-media project for traning</p>
			</div>
			<form>
				<p>
					{registration
						? 'You have profile?'
						: 'Make new profile?'
					}
					<span onClick={e => changeForm(e)}>
						{registration
							? 'Login'
							: 'Registration'
						}
					</span>
				</p>

				<div className={s.box}>
					<p>Email</p>

					<div>
						<Error error={errorEmail(email)} />

						<input
							onChange={e => email.onChange(e)}
							onBlur={() => email.onBlur()}
							value={email.value}
							type='text'
							placeholder='Enter your email...'
						/>
					</div>

				</div>

				<div className={s.box}>

					<p>Password</p>

					<div>
						<Error error={errorPassword(password)} />

						<input
							onChange={e => password.onChange(e)}
							// onBlur={() => password.onBlur()}
							value={password.value}
							type={checked ? 'text' : 'password'}
							placeholder='Password'
						/>

					</div>
				</div>

				<div className={s.box}>

					<p>Repeat password</p>

					<input
						onChange={e => setCheckPasword(e.target.value)}
						onBlur={() => password.onBlur()}
						value={checkPasword}
						type={checked ? 'text' : 'password'}
						placeholder='Enter your password...'
					/>
				</div>

				<div className={s.check} >
					<p>Show password</p>
					<input
						type="checkbox"
						checked={checked}
						onChange={() => setChecked(!checked)}
					/>
				</div>

				{registration && <>


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
				</>}

				<Btn1
					// disabled={!email.inputValid || !password.inputValid}
					text={registration ? 'Registration' : 'Login'}
					cnanging={true}
					onClick={() => submit()}
				/>
			</form>
		</div>
	)
}

export default Authorization
