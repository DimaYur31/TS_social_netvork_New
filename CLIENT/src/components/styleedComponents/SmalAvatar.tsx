import React from 'react'
import styled from 'styled-components'

const StyledSmalAvatar = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
object-position: 0 0;
`

interface IProps {
	src: string
}

const SmalAvatar: React.FC<IProps> = ({ src }) => {
	return <StyledSmalAvatar src={src} />
}

export default React.memo(SmalAvatar)