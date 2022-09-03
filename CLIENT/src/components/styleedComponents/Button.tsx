import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

const SButton = styled.button`
position: relative;
background: #0690fd;
color: #fff;
width: 50px;
height: 50px;
display: flex;
justify-content: center;
align-items: center;
transition: 0.5s;
box-shadow: 0 15px 20px #0690fd44;
overflow: hidden;
text-transform: uppercase;
letter-spacing: 0.1em;
font-size: 1em;
border: none;
outline: none;

&:hover{
	width: 150px;
}

&::before{
	content: '';
	position: absolute;
	right: 20px;
	width: 10px;
	height: 10px;
	border-top: 3px solid #fff;
	border-right: 3px solid #fff;
	transform: rotate(45deg);
	transition: 0.5s;
}

&:hover::before{
	transform: rotate(45deg) translate(50px, -50px)
}

&::after{
	content: '';
	position: absolute;
	left: -60px;
	width: 10px;
	height: 10px;
	border-top: 3px solid #fff;
	border-right: 3px solid #fff;
	transform: rotate(45deg) translate(-50px, 50px);
	transition: 0.5s;
}

&:hover::after{
	transform: rotate(45deg) translate(50px, -50px);
}

& span {
	visibility: hidden;
	opacity: 0;
	white-space: nowrap;
	transition: 0.5s;
	transform: translateX(-30px);
	color: inherit;
	margin: 0;
	display: flex;
	justify-content: flrx-start;
	align-items: center;
}

&:hover span{
	visibility: visible;
	opacity: 1;
	transform: translateX(30px);
}
`
interface IProps {
	children?: ReactNode
	exit: (e: React.MouseEvent) => void
}

const Button: FC<IProps> = (props) => {

	return (
		<SButton {...props} onClick={(e) => props.exit(e)}>
			<span {...props} />
		</SButton>
	)
}

export default Button