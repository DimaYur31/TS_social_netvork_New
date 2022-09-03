import { ChangeEvent, useEffect, useState } from 'react'


interface Ivalidations {
	isEmpty: boolean
	minLength: number
	maxLength: number
	isEmail: boolean | null
}


// interface IuseValidationReturn {
// 	isEmpty: boolean
// 	minLengthError: boolean
// 	emailError: boolean
// 	maxLengthError: boolean
// 	inputValid: boolean
// }

const useValidation = (value: string, validations: Ivalidations) => {
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

export const useFormValidation = (initialValue: string, validations: Ivalidations) => {
	const [value, setValue] = useState(initialValue)
	const [isDirty, setDirty] = useState(false)
	const valid = useValidation(value, validations)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
	const onBlur = () => setDirty(true)

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...valid
	}
}


interface IErrorEmail {
	isDirty: boolean
	isEmpty: boolean
	minLengthError: boolean
	emailError: boolean
}

export const errorEmail = (email: IErrorEmail) => {
	if (email.isDirty && email.isEmpty) {
		return 'Поле не может быть пустым'
	} else if (email.isDirty && email.minLengthError) {
		return 'Некорректная длинна'
	} else if (email.isDirty && email.emailError) {
		return 'Некорректный Email'
	}
	return null
}

interface IErrorPassword {
	isDirty: boolean
	isEmpty: boolean
	minLengthError: boolean
	maxLengthError: boolean
}
export const errorPassword = (password: IErrorPassword) => {
	if (password.isDirty && password.isEmpty) {
		return 'Поле не может быть пустым'
	} else if (password.isDirty && password.minLengthError) {
		return 'Некорректная длинна'
	} else if (password.isDirty && password.maxLengthError) {
		return 'Пароль слишком длинный'
	}
	return null
}