import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContentWrapperProps {
	children: ReactNode
	isAuth: boolean
}

const StyledContent = styled.div<ContentWrapperProps>`
	position: relative;
	display: grid;
	grid-template-columns: ${({ isAuth }) => (isAuth ? 'minmax(120px, 200px) auto' : '1fr')};

	@media(max-width:450px){
		grid-template-columns: ${({ isAuth }) => (isAuth ? '60px auto' : '1fr')};
	}
`;

export const ContentWrapper = (props: ContentWrapperProps) => {
	return <StyledContent {...props} />;
};