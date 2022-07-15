import { useEffect, useState } from 'react'

const useValidation = (value, validations) => {
	const [isEmpty, setEmpty] = useState(true)
	const [minLengthError, setMinLengthError] = useState(false)
	const [maxLengthError, setMaxLengthError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [inputValid, setInputValid] = useState(false)

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'minLength':
					value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
					break
				case 'isEmpty':
					value ? setEmpty(false) : setEmpty(true)
					break
				case 'maxLength':
					value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
					break
				case 'isEmail':
					const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
					break
			}
		}
	}, [value])

	useEffect(() => {
		if (isEmpty || maxLengthError || minLengthError || emailError) {
			setInputValid(false)
		} else {
			setInputValid(true)
		}
	}, [isEmpty, maxLengthError, minLengthError, emailError])

	return {
		isEmpty,
		minLengthError,
		emailError,
		maxLengthError,
		inputValid,
	}
}

export const useInput = (initialValue, validations) => {
	const [value, setValue] = useState(initialValue)
	const [isDirty, setDirty] = useState(false)
	const valid = useValidation(value, validations)

	const onChange = (e) => setValue(e.target.value)
	const onBlur = () => setDirty(true)

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...valid
	}
}

export const errorEmail = (email) => {
	if (email.isDirty && email.isEmpty) {
		return 'Поле не может быть пустым'
	} else if (email.isDirty && email.minLengthError) {
		return 'Некорректная длинна'
	} else if (email.isDirty && email.emailError) {
		return 'Некорректный Email'
	}
	return null
}

export const errorPassword = (password) => {
	if (password.isDirty && password.isEmpty) {
		return 'Поле не может быть пустым'
	} else if (password.isDirty && password.minLengthError) {
		return 'Некорректная длинна'
	} else if (password.isDirty && password.maxLengthError) {
		return 'Пароль слишком длинный'
	}
	return null
}

{/* {(email.isDirty && email.isEmpty) && <div style={{ color: 'red' }}>Поле не может быть пустым</div>}
{(email.isDirty && email.minLengthError) && <div style={{ color: 'red' }}>Некорректная длинна</div>}
{(email.isDirty && email.emailError) && <div style={{ color: 'red' }}>Некорректный Email</div>} */}