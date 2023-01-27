import { ReactNode } from 'react'
import styled from 'styled-components'

interface ContentWrapperProps {
	children: ReactNode
	isAuth: boolean
}

const StyledContent = styled.div<ContentWrapperProps>`
position: relative;
display: grid;
grid-template-columns: ${({ isAuth }) => (isAuth ? 'minmax(130px, 230px) auto' : '1fr')};
`

export const ContentWrapper = (props: ContentWrapperProps) => {
	return <StyledContent {...props} />
}