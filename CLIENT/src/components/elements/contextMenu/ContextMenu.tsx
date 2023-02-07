import { useContext } from 'react';
import { SVG } from '../../../img/icons/exportIcons';
import { socket } from '../../../socket';
import { EditContext } from '../../messenger/messengerContext/EditMessageContext';
import style from './ContextMenu.module.scss';

type ContextMenuProps = {
	text: string
	id: string
}

export const ContextMenu = ({ text, id }: ContextMenuProps) => {
	const { setEditState } = useContext(EditContext);

	const editMessage = () => {
		setEditState({
			isEdit: true,
			text: text,
			messageId: id
		});
	};

	const deleteMessage = (messageId: string) => {
		socket.emit('deleteMessage', messageId);
	};

	return (
		<span className={style.contextMenu}>
			<span onClick={() => editMessage()}>
				<SVG.Edit style={{ fill: 'green' }} />
			</span>
			<span onClick={() => deleteMessage(id)}>
				<SVG.Cancel style={{ fill: 'red' }} />
			</span>
		</span>
	);
}; 