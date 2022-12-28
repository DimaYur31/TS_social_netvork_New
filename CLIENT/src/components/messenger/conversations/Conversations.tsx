import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { setCurrentChat } from '../../../store/slices/chatSlice'
import ChatRoom from '../chatRoom/ChatRoom'


const Conversations = () => {
	const dispatch = useAppDispatch()
	const { _id } = useAppSelector(store => store.profilePage.defaultUser)
	const { chats } = useAppSelector(store => store.messenger)

	return <>
		{chats.length
			? chats.map(chat => {
				return <div
					key={chat._id}
					onClick={() => dispatch(setCurrentChat(chat._id))}
				>
					<ChatRoom
						userId={_id}
						room={chat}
					/>
				</div>
			})
			: <p>Conversations list is empty</p>
		}
	</>
}

export default Conversations