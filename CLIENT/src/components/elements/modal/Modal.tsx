import { ReactNode } from 'react';
import { SVG } from '../../../img/icons/exportIcons';
import style from './Modal.module.scss';

type ModalProps = {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	children: ReactNode
}

export const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
	return (
		<>
			{
				isOpen &&
				<div className={style.modal}>
					<div className={style.wrapper}>
						{children}
						<SVG.Cancel className={style.close} onClick={() => setIsOpen(false)} />
					</div>
				</div>
			}
		</>
	);
};