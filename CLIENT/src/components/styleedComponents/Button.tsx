import { FC, MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

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
`;
interface ButtonProps {
	children: ReactNode
	onClick: (e: MouseEvent) => void
}

export const Button: FC<ButtonProps> = (props) => {
	return <SButton {...props} />;
};