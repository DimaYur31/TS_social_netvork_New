import { FC, ReactNode } from 'react'
import styled from 'styled-components'

export interface IProps {
	children: ReactNode
	isAuth: boolean
}

const StyledContent = styled.div<IProps>`
position: relative;
display: grid;
grid-template-columns: ${({ isAuth }) => (isAuth ? 'minmax(130px, 230px) auto' : '1fr')};
`

const ContentWrapper: FC<IProps> = (props) => {
	return <StyledContent {...props} />
}

export default ContentWrapper