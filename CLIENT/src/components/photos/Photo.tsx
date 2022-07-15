import { FC, } from 'react'
import { getPhoto } from '../../hooks/hooks'
import { useAppDispatch } from '../../hooks/reactReduxHooks'
import { changeUserProfile, deletePhotoThunk } from '../../store/slices/apiActions/userActions'
// @ts-ignore
import s from './Photo.module.css'


const Photo: FC<{ photo: string, id: string }> = ({ id, photo }) => {
	const dispatch = useAppDispatch()
	const delPhoto = (id: string, photo: string) => {
		dispatch(deletePhotoThunk(id, photo))
	}

	const setAvatar = (photo: string) => {
		dispatch(changeUserProfile(id, { avatar: photo }))
	}
	return (
		<div className={s.photo}>
			<img src={getPhoto(photo)} />
			<div>
				<button onClick={() => delPhoto(id, photo)}>Delete</button>
				<button onClick={() => setAvatar(photo)}>Set Avatar</button>
			</div>
		</div>
	)
}

export default Photo