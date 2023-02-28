import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { socket } from '../../socket';
import { useAppSelector, useAppDispatch } from '../../hooks/reactReduxHooks';
import { selectDefaultUserId } from '../../selectors/selectors';
import { ContentWrapper } from '../styleedComponents/ContentWrapper';
import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { SocketUsers } from '../../types/conwersations';
import { appActions } from '../../store/slices/appSlice';

export const Layout = () => {
	const dispatch = useAppDispatch();
	const _id = useAppSelector(selectDefaultUserId);

	useLayoutEffect(() => {
		if (!_id) return;

		socket.emit('addUser', _id);
		socket.on('getUsers', (users: SocketUsers) => {
			const onlineUsers = users
				.reduce((previousValue: string[], currentValu) => {
					previousValue.push(currentValu.userId);

					return previousValue;

				}, []);

			dispatch(appActions.setOnlineUsers(onlineUsers));

			return () => {
				socket.emit('disconnect');
			};
		});

	}, [_id]);

	return (
		<>
			<Header />
			<ContentWrapper>
				<Navbar />
				<Outlet />
			</ContentWrapper>
		</ >
	);
};