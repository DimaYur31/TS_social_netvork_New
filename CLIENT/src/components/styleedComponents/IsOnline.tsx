import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { selectOnlineUsers } from '../../selectors/selectors';
import { useAppSelector } from '../../hooks/reactReduxHooks';

const Sircle = styled.span<IsOnlineProps>`
	position: absolute;
	top:0;
	z-index:2;
	left:29px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: ${({ isOnline }) => isOnline ? 'rgb(27, 255, 38)' : 'none'};
`;

interface IsOnlineProps {
	isOnline: boolean
}

export const IsOnline = ({ userId }: { userId: string }) => {
	const onlineUsers = useAppSelector(selectOnlineUsers);

	const [isOnline, setIsonline] = useState(onlineUsers.includes(userId));

	useEffect(() => {
		setIsonline(onlineUsers.includes(userId));
	}, [onlineUsers]);

	return <Sircle isOnline={isOnline} />;
};