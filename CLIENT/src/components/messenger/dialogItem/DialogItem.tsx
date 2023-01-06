import { useAppSelector } from '../../../hooks/reactReduxHooks'
import { EditMessageContext } from '../messengerContext/EditMessageContext'
import { selectCurrentChat, selectDefaultUserId } from '../../../selectors/selectors'
import s from './DialogItem.module.scss'

import DialogMessages from '../dialogMessages/DialogMessages'
import ChatForm from '../chatForm/ChatForm'

const DialogItem = () => {
	console.log('DialigItem render')
	const _id = useAppSelector(selectDefaultUserId)
	const currentChat = useAppSelector(selectCurrentChat)

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