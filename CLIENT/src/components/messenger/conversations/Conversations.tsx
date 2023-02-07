import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks';
import { selectChats, selectDefaultUserId } from '../../../selectors/selectors';
import { chatActions } from '../../../store/slices/chatSlice';
import { ChatRoom } from '../chatRoom/ChatRoom';
import style from './Conversations.module.scss';

export const Conversations = memo(() => {
	const dispatch = useAppDispatch();
	const _id = useAppSelector(selectDefaultUserId);
	const chats = useAppSelector(selectChats);

	const handelCurrentChat = (chatid: string) => {
		dispatch(chatActions.setCurrentChat(chatid));
	};

	return (
		<div className={style.conversations}>
			{chats.length
				? chats.map(chat => {
					return <NavLink
						className={({ isActive }) => isActive ? style.active : null}
						to={`/messenger/${chat._id}`}
						key={chat._id}
						onClick={() => handelCurrentChat(chat._id)}
					>
						<ChatRoom
							userId={_id}
							room={chat}
						/>
					</NavLink>;
				})
				: <p>Conversations list is empty</p>
			}
		</div>
	);
});