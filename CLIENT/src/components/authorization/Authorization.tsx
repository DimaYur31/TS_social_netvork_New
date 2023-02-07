import { FormEventHandler, useState } from 'react';
import { useAppDispatch } from '../../hooks/reactReduxHooks';
import { registrationThunkCreator, loginThunkCreator, } from '../../store/slices/apiActions/userActions';
import { FormFields, SybmitFotm } from '../../types/UIElements';
import { PrimaryInput } from '../elements/inputs/primaryInput/PrimaryInpyt';
import { PrimaryButton } from '../elements/btn/primaryButton/PrimaryButton';
import style from './Authorization.module.scss';

export const Authorization = () => {
	const dispatch = useAppDispatch();
	const [registration, setRegistration] = useState(false);
	const [checked, setChecked] = useState(false);

	const onSubmit: SybmitFotm = async (form) => {
		const { email, password, name, surname } = form;
		registration
			? name && surname && dispatch(registrationThunkCreator(email, password, name, surname))
			: dispatch(loginThunkCreator(email, password));
	};

	const changeForm = () => setRegistration(!registration);

	const handleSubmit: FormEventHandler<HTMLFormElement & FormFields> = (e) => {
		e.preventDefault();

		const form = e.currentTarget;
		const { email, password, checkPassword, name, surname } = form;

		password.value !== checkPassword.value
			? alert('Проверьте пароль')
			: onSubmit({
				email: email.value,
				password: password.value,
				checkPassword: checkPassword.value,
				name: name?.value,
				surname: surname?.value,
			});
	};

	return (
		<div className={style.auth}>
			<div className={style.leftBox}>
				<h1>V _ Comnate</h1>
				<p>This is social-media project for traning</p>
			</div>

			<div className={style.rightBox}>
				<p>
					{registration ? 'You have profile?' : 'Make new profile?'}
					<span onClick={() => changeForm()}>
						{registration ? 'Login' : 'Registration'}
					</span>
				</p>

				<form onSubmit={handleSubmit} autoComplete='new-password'>
					<label>
						<span>Email</span>
						<PrimaryInput
							name='email'
							type='email'
							required
						/>
					</label>

					<label>
						<span>Password</span>
						<PrimaryInput
							name='password'
							type={checked ? 'text' : 'password'}
							minLength={3}
							maxLength={16}
							required
							autoComplete='off'
						/>
					</label>

					<label>
						<span>Repeat Password</span>
						<PrimaryInput
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

					{registration && <>
						<label>
							<span>Name</span>
							<PrimaryInput
								name='name'
								type='text'
								placeholder='Enter your Name'
							/>
						</label>

						<label>
							<span>Surname</span>
							<PrimaryInput
								name='surname'
								type='text'
								placeholder='Enter your Surname'
							/>
						</label>
					</>}

					<PrimaryButton type='submit'>
						{registration ? 'Registration' : 'Login'}
					</PrimaryButton>
				</form>
			</div>
		</div>
	);
};