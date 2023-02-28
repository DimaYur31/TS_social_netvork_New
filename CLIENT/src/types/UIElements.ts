export type LoginFormFields = {
	email: string
	password: string
	checkPassword: string
	name?: string
	surname?: string
}

export type FormFields = {
	email: HTMLInputElement
	password: HTMLInputElement
	checkPassword: HTMLInputElement
	name?: HTMLInputElement
	surname?: HTMLInputElement
}

export type SybmitFotm = (form: LoginFormFields) => void

export type ProfileFormChanges = {
	name: string
	surname: string
	birthday: string
	city: string
	job: string
	country: string
	languages: string
}

export type ProfileFormFields = {
	name: HTMLInputElement
	surname: HTMLInputElement
	birthday: HTMLInputElement
	city: HTMLInputElement
	country: HTMLInputElement
	job: HTMLInputElement
	languages: HTMLInputElement
}