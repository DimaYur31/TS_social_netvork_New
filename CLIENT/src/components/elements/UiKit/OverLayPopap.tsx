import { FC, ReactNode } from 'react'
import s from './OverLayPopap.module.scss'

import Portal from './Portal'

type propsType = {
	children: ReactNode
	onClose: () => void
	isOpened: boolean
}

const OverLayPopap: FC<propsType> = ({ children, isOpened, onClose }) => {

	if (!isOpened) return null

	return (
		<Portal>
			<div className={s.container}>
				<div
					className={s.overlay}
					tabIndex={0}
					onClick={onClose}
				/>
				<div className={s.content}>{children}</div>
			</div>
		</Portal>
	)
}

export default OverLayPopap