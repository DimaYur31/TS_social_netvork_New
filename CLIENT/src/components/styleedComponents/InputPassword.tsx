import { FC, useState } from "react"
import styled from "styled-components"
import { useInput } from "../../hooks/useInput"
import { StyledInput } from "./Input"//@ts-ignore
import { ReactComponent as Show } from '../../img/show.svg'//@ts-ignore
import { ReactComponent as Hide } from '../../img/hide.svg'



interface IProps {
	placeholder: string
	type?: string
}

const StyledPasswors = styled(StyledInput)``
const StuledDiv = styled.span`
display: flex;
align-items: center;
position: relative;

& .eye{
	position: absolute;
	right: 40px;
	top: 6px;
}
`

const InputPassword: FC<IProps> = ({ placeholder }) => {
	const input = useInput
	const [isShow, setIsShow] = useState(false)
	return <StuledDiv>
		< StyledPasswors
			type={isShow ? 'text' : 'password'}
			placeholder={placeholder}
			{...input}
		/>
		{
			isShow
				? <Show className='eye' width='20px' hide='20px' onClick={() => setIsShow(false)} />
				: <Hide className='eye' width='20px' hide='20px' onClick={() => setIsShow(true)} />
		}
	</StuledDiv>

}

export default InputPassword