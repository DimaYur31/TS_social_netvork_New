import { memo, useEffect, useState } from 'react';
import { UserType } from '../../../types/profile';
import { ConversationType } from '../../../types/conwersations';
import { getUserData } from '../../../api/userApi';
import { socket } from '../../../socket';
import { useAppDispatch } from '../../../hooks/reactReduxHooks';
import { getChatsThunk } from '../../../store/slices/apiActions/chatActions';
import { chatActions } from '../../../store/slices/chatSlice';
import { UserItem } from '../../elements/user-item/UserItem';
import { Clear } from '../../styleedComponents/Search';
import style from './ChatRoom.module.scss';

type RoomProps = {
	userId: string
	room: ConversationType
}

export const ChatRoom = memo(function ChatRoom({ room, userId }: RoomProps) {

	const dispatch = useAppDispatch();
	const [member, setMember] = useState<UserType | null>(null);
	const user = room.members.find(id => id !== userId);

	const fetchData = async () => {
		await getUserData(user!)
			.then(data => setMember(data));
	};

	useEffect(() => {
		fetchData();
	}, [user]);

	socket.on('deleteConversation', (conversationId: string) => {
		dispatch(chatActions.removeChat(conversationId));
	});

	const deleteChat = () => {
		socket.emit('deleteConversation', room._id);
		dispatch(getChatsThunk(userId));
		dispatch(chatActions.setCurrentChat(''));
	};

	return (
		member && <div className={style.chat} >
			<UserItem user={member} />
			<Clear onClick={() => deleteChat()} />
		</div>
	);
});