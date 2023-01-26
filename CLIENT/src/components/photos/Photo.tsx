import React, { FC } from 'react'

import { useAppDispatch } from '../../hooks/reactReduxHooks'
import { changeUserProfile, deletePhotoThunk } from '../../store/slices/apiActions/userActions'
import { usePhotosPath } from '../../hooks/hooks'
import { SVG } from '../../img/icons/exportIcons'

import s from './Photo.module.scss'

type TPprops = {
	photo: string
	userId: string
}

const Photo: FC<TPprops> = ({ userId, photo }) => {
	const dispatch = useAppDispatch()

	const delPhoto = (id: string, photo: string) => {
		dispatch(deletePhotoThunk(id, photo))
	}

	const setAvatar = (photo: string) => {
		dispatch(changeUserProfile(userId, { avatar: photo }))
	}

	return (
		<div className={s.photo}>
			<img src={usePhotosPath(photo)} alt='avatar' />

			<div className={s.buttons} >
				<button
					onClick={() => delPhoto(userId, photo)}>
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