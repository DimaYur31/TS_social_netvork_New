import { FC } from 'react'
import s from './Message.module.css'

type MessageType = {
	message: {
		// _id: string
		// userId: string
		text: string
		avatar: string
	}
	isOwner: boolean
}

const Message: FC<MessageType> = ({ message, isOwner }) => {
	const names = isOwner ? `${s.owner}` : null

	return (<>
		<div className={`${s.message} ${names}`}>
			<div>
				<img src={message.avatar} />
				<span>1 hour ago</span>
			</div>
			<p>{message.text}</p>
		</div>
	</>
	)
}

export default Message