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
				return <div onClick={() => dispatch(setCurrentChat(chat._id))}>
					<ChatRoom
						key={chat._id}
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