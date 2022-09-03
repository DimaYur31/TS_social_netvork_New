import styled from "styled-components";



const Sircle = styled.span<IProps>`

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
	border: 2px solid white;
	border-radius: 50%;
	background: ${({ isOnline }) => isOnline ? 'rgb(10, 207, 3)' : 'red'};
	}
`;

interface IProps {
	isOnline: boolean
}

const IsOnline: React.FC<IProps> = (props) => {

	return <Sircle  {...props} />
}

export default IsOnline