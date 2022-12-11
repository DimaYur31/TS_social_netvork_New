import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'
import { uploadPhotoThunkCreator } from '../../store/slices/apiActions/userActions'
import s from './Photo.module.scss'

import Photo from './Photo'

const Photos = () => {
	const dispatch = useAppDispatch()
	const { _id, photos } = useAppSelector(state => state.profilePage.defaultUser)

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

			<div className={s.photos}>
				{photos.map((photo: string) => {
					return <Photo key={photo} photo={photo} id={_id} />
				})}
			</div>
		</>
	)
}

export default Photos