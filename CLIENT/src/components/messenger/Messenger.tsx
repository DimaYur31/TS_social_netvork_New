import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks';
import { getChatsThunk } from '../../store/slices/apiActions/chatActions';
import { selectDefaultUserId } from '../../selectors/selectors';
import { Conversations } from './conversations/Conversations';
import style from './Messenger.module.scss';

const Messenger = () => {
	const dispatch = useAppDispatch();
	const _id = useAppSelector(selectDefaultUserId);

	useEffect(() => {
		dispatch(getChatsThunk(_id));
	}, []);

	return (
		<div className={style.messenger}>
			<Conversations />
			<Outlet />
		</div>
	);
};

export default Messenger;