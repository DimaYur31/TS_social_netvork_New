import { useState, useEffect, } from 'react'

const useContextMenu = () => {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const handleClick = () => {
			setShow(false)
		}
		document.addEventListener('click', handleClick)

		return () => document.removeEventListener('click', handleClick)
	}, [])

	return { show, setShow }
}

export default useContextMenu