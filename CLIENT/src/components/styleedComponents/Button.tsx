import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

const SButton = styled.button`
position: relative;
background: #0690fd;
color: #fff;
width: 100px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
transition: 0.35s;// overflow: hidden;
letter-spacing: 0.1em;
font-size: 18px;
border: none;
outline: none;
cursor:pointer;

&:hover{
	background: #334CBE;
}
`
interface IProps {
	children: ReactNode
	onClick: (e: React.MouseEvent) => void
}

const Button: FC<IProps> = (props) => {
	return <SButton {...props} />
}

export default Button