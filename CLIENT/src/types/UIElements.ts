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