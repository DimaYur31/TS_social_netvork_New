import { ReactNode } from 'react';
import { Portal } from './Portal';
import style from './OverLayPopap.module.scss';

type OverLayProps = {
	children: ReactNode
	onClose: () => void
	isOpened: boolean
}

export const OverLayPopap = ({ children, isOpened, onClose }: OverLayProps) => {

	if (!isOpened) return null;

	return (
		<Portal>
			<div className={style.container}>
				<div
					className={style.overlay}
					tabIndex={0}
					onClick={onClose}
				/>
				<div className={style.content}>{children}</div>
			</div>
		</Portal>
	);
};