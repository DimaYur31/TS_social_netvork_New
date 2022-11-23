import s from './ChatBox.module.css'

import Message from '../message/Message'

const ChatBox = () => {
	const messages = [
		{ _id: 1, userId: 1, text: 'text1', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC_aCBbbtJtckooDvDKF5-RTEZ6H92d3y47A&usqp=CAU' },
		{ _id: 2, userId: 2, text: 'text ddda', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8_v6rn22QsrRWkKmCvCdap8vVbcyFz0Layg&usqp=CAU' },

		{ _id: 3, userId: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error laborum sapiente nesciunt, cupiditate saepe quia tenetur quisquam at voluptatum sequi excepturi dolore? Debitis dignissimos, commodi est atque voluptatem provident maxime.', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC_aCBbbtJtckooDvDKF5-RTEZ6H92d3y47A&usqp=CAU' },
		{ _id: 3, userId: 2, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error laborum sapiente nesciunt, cupiditate saepe quia tenetur quisquam at voluptatum sequi excepturi dolore? Debitis dignissimos', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8_v6rn22QsrRWkKmCvCdap8vVbcyFz0Layg&usqp=CAU' },

	]


	return (
		<div className={s.chat} >{
			messages.map(message => {
				return <>
					<Message key={message._id} message={message} isOwner={false} />
					<Message key={message._id} message={message} isOwner={true} />
				</>
			})
		}</div>
	)
}

export default ChatBox