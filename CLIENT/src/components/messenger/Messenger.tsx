import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks';
import { getChatsThunk } from '../../store/slices/apiActions/chatActions';
import { selectChats, selectDefaultUserId } from '../../selectors/selectors';
import { Conversations } from './conversations/Conversations';
import style from './Messenger.module.scss';

const Messenger = () => {
	const dispatch = useAppDispatch();
	const _id = useAppSelector(selectDefaultUserId);
	const chats = useAppSelector(selectChats);

	useEffect(() => {
		dispatch(getChatsThunk(_id));
	}, [chats]);

	return (
		<div className={style.messenger}>
			<Conversations />
			<Outlet />
		</div>
	);
};

export default React.memo(Messenger);