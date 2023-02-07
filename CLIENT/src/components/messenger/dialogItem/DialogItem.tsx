import { useAppSelector } from '../../../hooks/reactReduxHooks';
import { EditMessageContext } from '../messengerContext/EditMessageContext';
import { selectCurrentChat, selectDefaultUserId } from '../../../selectors/selectors';
import { DialogMessages } from '../dialogMessages/DialogMessages';
import { ChatForm } from '../chatForm/ChatForm';
import style from './DialogItem.module.scss';

export const DialogItem = () => {
	const _id = useAppSelector(selectDefaultUserId);
	const currentChat = useAppSelector(selectCurrentChat);

	return (
		<>
			{
				currentChat
					? <div className={style.dialog}>
						<EditMessageContext>
							<>
								<DialogMessages conversationId={currentChat} />
								<ChatForm userId={_id} chatId={currentChat} />
							</>
						</EditMessageContext>
					</div>
					: <p>Open a conversation to start a chat.</p>
			}
		</>
	);
};