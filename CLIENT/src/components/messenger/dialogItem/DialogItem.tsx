import s from './DialogItem.module.scss'
import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { EditMessageContext } from '../messengerContext/EditMessageContext'

import DialogMessages from '../dialogMessages/DialogMessages'
import ChatForm from '../chatForm/ChatForm'

const DialogItem = () => {
	const { _id } = useAppSelector(store => store.profilePage.defaultUser)
	const { currentChat } = useAppSelector(store => store.messenger)

	return <>
		{
			currentChat
				? <div className={s.dialog}>
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
}

export default DialogItem