import { useAppSelector } from '../../../hooks/reactReduxHooks'
import s from './DialogItem.module.css'

import DialogMessages from '../dialogMessages/DialogMessages'
import ChatForm from '../chatForm/ChatForm'

const DialogItem = () => {
	const { _id } = useAppSelector(store => store.profilePage.defaultUser)
	const { currentChat } = useAppSelector(store => store.messenger)

	return <>
		{
			currentChat
				? <div className={s.dialog}>
					<DialogMessages conversationId={currentChat} />
					<ChatForm userId={_id} chatId={currentChat} />
				</div>
				: <p>Open a conversation to start a chat.</p>
		}
	</>
}

export default DialogItem