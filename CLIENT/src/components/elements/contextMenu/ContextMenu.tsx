import { FC, useContext } from 'react'
import { SVG } from '../../../img/icons/exportIcons'
import { socket } from '../../../socket'
import { EditContext } from '../../messenger/messengerContext/EditMessageContext'
import s from './ContextMenu.module.scss'

type ContextMenuProps = {
	text: string
	id: string
}

const ContextMenu: FC<ContextMenuProps> = ({ text, id }) => {
	const { setEditState } = useContext(EditContext)

	const editMessage = () => {
		setEditState({
			isEdit: true,
			text: text,
			messageId: id
		})
	}

	const deleteMessage = (messageId: string) => {
		socket.emit('deleteMessage', messageId)
	}

	return <>
		<div className={s.contextMenu}>
			<span onClick={() => editMessage()}>
				<SVG.Edit style={{ fill: 'green' }} />
			</span>
			<span onClick={() => deleteMessage(id)}>
				<SVG.Cancel style={{ fill: 'red' }} />
			</span>
		</div>
	</>
}

export default ContextMenu