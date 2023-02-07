import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks';
import { getMessagesThunk } from '../../../store/slices/apiActions/chatActions';
import { socket } from '../../../socket';
import { chatActions } from '../../../store/slices/chatSlice';
import { selectMessages } from '../../../selectors/selectors';
import { Message } from '../message/Message';
import style from './DialogMessages.module.scss';

export const DialogMessages = React.memo(({ conversationId }: { conversationId: string }) => {
	const dispatch = useAppDispatch();
	const messages = useAppSelector(selectMessages);
	// const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		dispatch(getMessagesThunk(conversationId));
		// scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages]);


	socket.on('getMessage', message => {
		dispatch(chatActions.getMessage(message));
	});

	socket.on('removedMessage', (messageId: string) => {
		dispatch(chatActions.removeMessage(messageId));
	});

	socket.on('updateMessage', (message: any) => {
		dispatch(chatActions.editMessage(message));
	});


	// Данный компонент постоянно рендерится, пока не заню что с этим делать
	// console.log('DialogMessages render')
	return (
		<div className={style.chat}>{
			messages?.map(message => {
				return <div key={message._id}
				// ref={scrollRef}
				>
					<Message message={message} />
				</div>;
			})
		}</div>
	);
});