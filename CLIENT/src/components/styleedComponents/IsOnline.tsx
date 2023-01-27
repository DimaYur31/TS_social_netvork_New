import styled from 'styled-components'

const Sircle = styled.span<IsOnlineProps>`
	content:'';
	position: absolute;
	top: 0;
	left: 0;
	
	&::before{
		content:'';
		position: absolute;
		left:30px;
		top: -4px;
		width: 10px;
		height: 10px;
		border: ${({ isOnline }) => isOnline ? '2px solid white' : 'none'};
		border-radius: 50%;
		background: ${({ isOnline }) => isOnline ? 'rgb(10, 207, 3)' : 'none'};
	}
`

interface IsOnlineProps {
	isOnline: boolean
}

export const IsOnline = (props: IsOnlineProps) => {
	return <Sircle  {...props} />
}