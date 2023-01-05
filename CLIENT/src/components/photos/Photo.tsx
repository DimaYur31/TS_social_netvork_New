import React, { FC } from 'react'
import { getPhoto } from '../../hooks/hooks'
import { useAppDispatch } from '../../hooks/reactReduxHooks'
import { changeUserProfile, deletePhotoThunk } from '../../store/slices/apiActions/userActions'
import { SVG } from '../../img/icons/exportIcons'
import s from './Photo.module.scss'

type TPprops = {
	photo: string
	id: string
}

const Photo: FC<TPprops> = ({ id, photo }) => {
	const dispatch = useAppDispatch()
	console.log('Photo render')
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
				<button
					onClick={() => delPhoto(id, photo)}>
					<SVG.Dustbin className={s.button} />
				</button>
				<button onClick={() => setAvatar(photo)}>
					<SVG.More className={`${s.button} ${s.more}`} />
				</button>

			</div>
		</div>
	)
}

export default React.memo(Photo)