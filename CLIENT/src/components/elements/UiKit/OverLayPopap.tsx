import { FC, ReactNode } from 'react'
import Portal from './Portal'
//@ts-ignore
import s from './OverLayPopap.module.css'

type propsType = {
	children: ReactNode
	onClose: () => void
	isOpened: boolean
}

const OverLayPopap: FC<propsType> = ({ children, isOpened, onClose }) => {

	if (!isOpened) {
		return null
	}

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