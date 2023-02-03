import { memo } from 'react';
import styled from 'styled-components';

const StyledSmalAvatar = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
object-position: 0 0;
`;

interface IProps {
	src: string
}

export const SmalAvatar = memo(({ src }: IProps) => {
	return <StyledSmalAvatar src={src} />;
});