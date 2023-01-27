import { ReactNode } from 'react'

import { SVG } from '../../../img/icons/exportIcons'

import s from './Modal.module.scss'

type ModalProps = {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	children: ReactNode
}

export const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
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