import { ChangeEvent, FC, ReactComponentElement, useState } from 'react'
import styled from 'styled-components'

import { useInput } from '../../hooks/useInput'

interface IProps {
	input: {
		placeholder: string
		value: string
		onChange: (e: ChangeEvent<HTMLInputElement>) => void
		label: string
		errorMessage: string,
		id: string,
		inputProps: any
	}
}

export const StyledInput = styled.input`
position: relative;
border: none;
background: #fafafa;
padding: 0px 20px;
font-size: 12px;
border-radius: 8px;
outline: none;
box-shadow: -2px -2px 5px rgba(255,255,255,1),
				inset 2px 2px 5px rgba(0,0,0,0.05),
				inset -2px -2px 5px rgba(255,255,255,1),
				inset 2px 2px 5px rgba(0,0,0,0.05);

&::plaseholder{
	color:ccc
}
`

const Input: FC<IProps> = ({ input }) => {
	const [focused, setFocused] = useState(false)
	const { label, errorMessage, onChange, id, ...inputProps } = input
	// const input = useInput
	// const {placeholder, value,onChange} = input
	const handleFocus = () => setFocused(true)

	return <>
		<StyledInput
			{...inputProps}
			onChange={onChange}
			onBlur={handleFocus}
		// onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
		// focused={focused.toString()}
		/>
		<span>{errorMessage}</span>
	</>
}

export default Input


