import React, { ReactNode, FC } from 'react'
import styled from 'styled-components'

interface StyledDivInterfase {
	cssPisition: string
	children: ReactNode
	// className: string
	ref?: JSX.IntrinsicElements["div"]
}
type typediv = typeof PhotosDiv


const PhotosDiv = styled.div<StyledDivInterfase>`
	position: relative;
	display: flex;
	justify-content: center;
	transition: 1s;
	padding-bottom: 70%;
	overflow: hidden;
	border-radius: 16px;
	transform-origin: ${props => props.cssPisition}; 
	// transform-origin: left top;

	&:hover{
		transform:scale(1.2);
		z-index: 20;
		transition: 1s;
	}
		`;

const StyledPhoto = React.forwardRef<HTMLDivElement, StyledDivInterfase>((props, ref) => {
	return <PhotosDiv cssPisition={props.cssPisition} >
		{props.children}
	</PhotosDiv>
})

export default StyledPhoto