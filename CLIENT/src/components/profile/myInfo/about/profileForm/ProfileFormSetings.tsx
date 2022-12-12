import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reactReduxHooks'
import { changeUserProfile } from '../../../../../store/slices/apiActions/userActions'
import s from './ProfileFormSetings.module.scss'

type FormFields = {
	name: HTMLInputElement
	surname: HTMLInputElement
	birthday: HTMLInputElement
	city: HTMLInputElement
	country: HTMLInputElement
	job: HTMLInputElement
	languages: HTMLInputElement
}

let getFormValues = (obj: any) => {
	let key = Object.keys(obj)
	let value = Object.values(obj)
	let newObj = {} as any

	for (let i = 0; i < value.length; i++) {
		if (value[i] !== '') {
			newObj[key[i]] = value[i]
		}
	}
	return newObj
}

const ProfileFormSetings = () => {
	const dispatch = useAppDispatch()
	const { defaultUser } = useAppSelector(state => state.profilePage)

	const handelSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = (event) => {
		event.preventDefault()
		const form = event.currentTarget
		const { name, surname, birthday, city, country, job, languages } = form

		const formChanges = {
			name: name.value,
			surname: surname.value,
			birthday: birthday.value,
			city: city.value,
			job: job.value,
			country: country.value,
			languages: languages.value,
		}

		let changes = getFormValues(formChanges)

		if (changes) dispatch(changeUserProfile(defaultUser._id, changes))
	}

	return (
		<form onSubmit={handelSubmit} className={s.form}>
			<fieldset>
				<legend>Name</legend>
				<input name='name' type="text" />
			</fieldset>
			<fieldset>
				<legend>Surname</legend>
				<input name='surname' type="text" />
			</fieldset>
			<fieldset>
				<legend>Birthday</legend>
				<input name='birthday' type="date" />
			</fieldset>
			<fieldset>
				<legend>City</legend>
				<input name='city' type="text" />
			</fieldset>
			<fieldset>
				<legend>Country</legend>
				<input name='country' type="text" />
			</fieldset>
			<fieldset>
				<legend>Job</legend>
				<input name='job' type="text" />
			</fieldset>
			<fieldset>
				<legend>Languages</legend>
				<input name='languages' type="text" />
			</fieldset>
			<button type='submit'>Edit</button>
		</form>
	)
}

export default ProfileFormSetings