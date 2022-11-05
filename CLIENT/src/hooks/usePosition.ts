import { useEffect, useState } from "react"

interface usePositionInterface {
	(parent: DOMRect | null,
		chaeld: DOMRect | null,
		width: { windowWidth: number }): string
}

export const usePosition = (parent: DOMRect | null, chaeld: DOMRect | null, width: { windowWidth: number }) => {
	const [cssPosition, setCssPosition] = useState('center center')
	// const [position, setPosition] = useState({
	// 	Xposition: 'center',
	// 	Yposition: 'center'
	// })

	// const countWidth = (parent: any, chaeld: any) => {
	// 	const [position, setPosition] = useState({
	// 		Xposition: 'center',
	// 		Yposition: 'center'
	// 	})

	// 	if (chaeld.x - parent.x < 50) {
	// 		setPosition({ ...position, Xposition: 'left' });
	// 	}

	// 	if (chaeld.y - parent.y < 50) {
	// 		setPosition({ ...position, Yposition: 'top' });
	// 	}

	// 	if ((parent.x + parent.width) - (chaeld.x + chaeld.width) < 50) {
	// 		setPosition({ ...position, Xposition: 'right' })
	// 	}

	// 	return `${position.Xposition} ${position.Yposition}`
	// }


	// useEffect(() => {
	// 	let parameters = countWidth(parent, chaeld)
	// 	setCssPosition(parameters)
	// }, [width])

	return cssPosition
}