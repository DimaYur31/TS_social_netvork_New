import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'
import { uploadPhotoThunkCreator } from '../../store/slices/apiActions/userActions'
import Photo from './Photo'
//@ts-ignore
import s from './Photo.module.css'

const Photos: React.FC = () => {
	const dispatch = useAppDispatch()
	const { _id, photos } = useAppSelector(state => state.profilePage.defaultUser)

	const mapPhotos = (photos: Array<string>) => {
		return photos.map((photo: string) => {
			return <Photo key={photo} photo={photo} id={_id} />
		})
	}

	// useEffect(() => {
	// 	mapPhotos(photos)
	// }, [photos])

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const formData = new FormData()
			formData.append('userId', _id)
			formData.append('img', e.target.files[0])
			dispatch(uploadPhotoThunkCreator(_id, formData))
		}
	}


	console.log('render Photos')
	return (
		<>
			<div><input type="file" onChange={selectFile} /></div>
			<div className={s.photos}>
				{mapPhotos(photos)}
			</div>
		</>
	)
}

export default Photos