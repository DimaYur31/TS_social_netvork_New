import { FC } from "react"
import styled from "styled-components"
import { useInput } from "../../hooks/useInput"

interface IProps {
	placeholder: string
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

const Input: FC<IProps> = ({ placeholder }) => {
	const input = useInput

	return <StyledInput
		placeholder={placeholder}
		{...input}
	/>
}

export default Input


