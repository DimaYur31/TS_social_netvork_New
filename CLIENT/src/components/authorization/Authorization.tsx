import { useState, useEffect, HtmlHTMLAttributes } from 'react'
// import { Navigate } from 'react-router-dom'
// @ts-ignore 
import s from './Authorization.module.css'

import Btn1 from '../elements/btn/Btn1'
import Error from '../elements/error/Error'
import { errorEmail, errorPassword } from '../../validation/validation'
import { useInput } from '../../validation/validation'
import { registrationThunkCreator, loginThunkCreator } from './../../store/slices/apiActions/userActions';
import {
	useAppDispatch,
	// useAppSelector 
} from '../../hooks/reactReduxHooks'

const Authorization = () => {
	const dispatch = useAppDispatch()
	// const { isAuth } = useAppSelector(state => state.profilePage)

	const loginEmail = { isEmpty: true, minLength: 3, isEmail: true, }
	const loginPassword = { isEmpty: true, minLength: 8, maxLength: 16 }
	const email = useInput('', loginEmail)
	const password = useInput('', loginPassword)
	const [registration, setRegistration] = useState(true)
	const [checkPasword, setCheckPasword] = useState('')
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')

	interface ICheckBox extends HtmlHTMLAttributes<boolean> {
		checked: boolean | undefined
	}
	const [checked, setChecked] = useState<React.ChangeEventHandler<ICheckBox>>()

	const click = async () => {
		if (password.value !== checkPasword) {
			alert('Проверьте пароль')
		} else {
			if (registration) {
				dispatch(registrationThunkCreator(email.value, password.value, name, surname))
			} else {
				dispatch(loginThunkCreator(email.value, password.value))
			}

		}

	}

	// useEffect(() => {
	// if (isAuth) return <Navigate to='/profile' />
	// }, [isAuth])не нужно

	return (
		<div className={s.auth}>
			<form>
				<p>{registration ? 'You have profile?' : 'Make new profile?'}
					<span onClick={(e) => {
						e.preventDefault()
						setRegistration(!registration)
					}}>
						{registration ? 'Login' : 'Registration'}
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
							onBlur={() => password.onBlur()}
							value={password.value}
							type={checked ? 'text' : 'password'}
							placeholder='Enter your password...'
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
						//@ts-ignore
						checked={checked}
						//@ts-ignore
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
					disabled={!email.inputValid || !password.inputValid}
					text={registration ? 'Registration' : 'Login'}
					cnanging={true}
					onClick={() => click()}
				/>
			</form>
		</div>
	)
}

export default Authorization