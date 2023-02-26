import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/reactReduxHooks';
import { EditMessageContext } from '../messengerContext/EditMessageContext';
import { selectCurrentChat, selectDefaultUserId } from '../../../selectors/selectors';
import { chatActions } from '../../../store/slices/chatSlice';
import { DialogMessages } from '../dialogMessages/DialogMessages';
import { Clear } from '../../styleedComponents/Search';
import { ChatForm } from '../chatForm/ChatForm';
import style from './DialogItem.module.scss';

export const DialogItem = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const _id = useAppSelector(selectDefaultUserId);
	const currentChat = useAppSelector(selectCurrentChat);

	const closeChat = () => {
		dispatch(chatActions.setCurrentChat(''));
		navigate('/messenger');
	};

	return (
		<>
			{currentChat
				? <div className={style.dialog}>
					<Clear onClick={() => closeChat()} />
					<EditMessageContext>
						<>
							<DialogMessages
								currentChat={currentChat}
							/>
							<ChatForm userId={_id} chatId={currentChat} />
						</>
					</EditMessageContext>
				</div>
				: <p>Open a conversation to start a chat.</p>
			}
		</>
	);
};