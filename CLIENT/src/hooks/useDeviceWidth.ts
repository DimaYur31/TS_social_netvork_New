import { useEffect, useState } from 'react'

const useDeviceWidth = () => {
	const [width, setWidth] = useState({ windowWidth: 0 })

	useEffect(() => {
		const hendleWidth = () => {
			setWidth({ windowWidth: window.innerWidth })
		}

		window.addEventListener('resize', hendleWidth)

		hendleWidth()

		return () => window.removeEventListener('resize', hendleWidth)
	}, [])

	return width
}

export default useDeviceWidth