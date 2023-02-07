import { MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
position: relative;
width: 100px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
background: var(--primary);
color: var(--white);
transition: 0.35s;// overflow: hidden;
letter-spacing: 0.1em;
font-size: 18px;
border: none;
outline: none;
cursor:pointer;

&:hover{
	background: var(--buttons-color);
}
`;
interface ButtonProps {
	children: ReactNode
	onClick: (e: MouseEvent) => void
}

export const Button = (props: ButtonProps) => {
	return <StyledButton {...props} />;
};