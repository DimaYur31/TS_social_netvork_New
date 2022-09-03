import { ChangeEvent, useState } from "react"

interface InputReturn {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	reset: () => void
}
export const useInput = (initialValue = ''): InputReturn => {
	const [value, setValue] = useState(initialValue)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

	const reset = () => setValue('')
	return { value, onChange, reset }
}