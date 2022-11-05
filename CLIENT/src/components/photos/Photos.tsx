import React, { ChangeEvent, RefObject, useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'
// import useDeviceWidth from '../../hooks/useDeviceWidth'
import { uploadPhotoThunkCreator } from '../../store/slices/apiActions/userActions'
import Photo from './Photo'
//@ts-ignore
import s from './Photo.module.css'

const Photos = () => {
	const dispatch = useAppDispatch()
	const { _id, photos } = useAppSelector(state => state.profilePage.defaultUser)
	// const width = useDeviceWidth()
	const [CSSposition, setCSSPosition] = useState('center center')
	const [position, setPosition] = useState({ Xposition: '', Yposition: '' })

	const countWidth = (parentRef: DOMRect | null, chaeldRef: DOMRect | null) => {
		if (parentRef && chaeldRef) {
			// console.log(parentRef.top - chaeldRef.top);

			if (chaeldRef.right - parentRef.right <= 0 && parentRef.top - chaeldRef.top < 0) {
				setPosition({ Xposition: 'righr', Yposition: 'center' });
			} else if (chaeldRef.left - parentRef.left <= 0 && parentRef.top - chaeldRef.top < 0) {
				setPosition({ Xposition: 'left', Yposition: 'center' });
			} else if (chaeldRef.left - parentRef.left <= 0 && parentRef.top - chaeldRef.top >= 0) {
				setPosition({ Xposition: 'left', Yposition: 'top' });
			} else if (parentRef.right - chaeldRef.right < 30 && parentRef.top - chaeldRef.top >= 0) {
				setPosition({ Xposition: 'right', Yposition: 'top' });
			} else if (chaeldRef.left - parentRef.left > 0 && parentRef.top - chaeldRef.top >= 0) {
				setPosition({ Xposition: 'center', Yposition: 'top' });
			} else if (chaeldRef.left - parentRef.left > 0 && parentRef.top - chaeldRef.top < 0) {
				setPosition({ Xposition: 'center', Yposition: 'center' });
			}
		}
	}

	const [parentRef, setParentRef] = useState(null as DOMRect | null)
	const [chaeldRef, setChaeldRef] = useState(null as DOMRect | null)


	useLayoutEffect(() => {
		setCSSPosition(`${position.Xposition} ${position.Yposition}`)
		// setChaeldRef(refChaeld.current && refChaeld.current.getBoundingClientRect())
	}, [position, chaeldRef])

	useEffect(() => {
		setParentRef(refParent.current && refParent.current.getBoundingClientRect())
		// setChaeldRef(refChaeld.current && refChaeld.current.getBoundingClientRect())
	}, [])

	// -------------------------------------------


	const hoverMouse = (rect: DOMRect) => {
		if (!chaeldRef) {
			setChaeldRef(prev => prev = rect)
		}

		// if (chaeldRef !== rect) {
		countWidth(parentRef, rect)
		// setCSSPosition(`${position.Xposition} ${position.Yposition}`)
		// } else {
		// alert(-1)
		// }
		// else {
		// setCSSPosition(`${position.Xposition} ${position.Yposition}`)
		// }
		// let count = countWidth(parentRef, rect)
		// console.log(count);

	}


	// --------------------------------------------

	const refParent = useRef() as RefObject<HTMLDivElement>
	// const refChaeld = useRef() as RefObject<HTMLDivElement>


	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const formData = new FormData()
			formData.append('userId', _id)
			formData.append('img', e.target.files[0])
			dispatch(uploadPhotoThunkCreator(_id, formData))
		}
	}


	return (
		<>
			<input type="file" onChange={selectFile} />

			<div className={s.photos} ref={refParent}>

				{photos.map((photo: string) => {
					return <Photo key={photo} photo={photo} id={_id}
						hoverMouse={hoverMouse} CSSposition={CSSposition}
					/>
				})}

			</div>
		</>
	)
}

export default Photos