import { FC, useContext } from 'react'
import s from './ContextMenu.module.scss'
import { SVG } from '../../../img/icons/exportIcons'
import { socket } from '../../../socket'
import { EditContext } from '../../messenger/messengerContext/EditMessageContext'

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

	return (
		<div className={s.contextMenu}>
			<ul>
				<li>
					<span
						onClick={() => deleteMessage(id)}
					><SVG.Dustbin /></span>
				</li>
				<li>
					<span
						onClick={() => editMessage()}
					><SVG.Edit /></span>
				</li>
			</ul>
		</div>
	)
}

export default ContextMenu