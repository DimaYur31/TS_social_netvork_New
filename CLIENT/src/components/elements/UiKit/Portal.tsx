import React, { useEffect, useState, ReactNode, FC } from 'react'
import ReactDOM from 'react-dom'

type PropsType = {
	children: ReactNode
}

const Portal: FC<PropsType> = ({ children }) => {
	const [container] = useState(() => document.createElement('div'))

	useEffect(() => {
		document.body.appendChild(container)

		return () => {
			document.body.removeChild(container)
		}
	}, [])

	return ReactDOM.createPortal(children, container)
}

export default Portal