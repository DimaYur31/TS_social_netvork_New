import { FC, ReactNode } from 'react'
import s from './Modal.module.scss'
import { SVG } from '../../../img/icons/exportIcons'

type ModalProps = {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {

	return <>
		{
			isOpen &&
			<div className={s.modal}>
				<div className={s.wrapper}>
					{children}
					<SVG.Cancel className={s.close} onClick={() => setIsOpen(false)} />
				</div>
			</div>
		}
	</>
}

export default Modal