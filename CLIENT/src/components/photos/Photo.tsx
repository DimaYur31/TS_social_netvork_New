import { FC } from 'react'
import { getPhoto } from '../../hooks/hooks'
import { useAppDispatch } from '../../hooks/reactReduxHooks'
import { SVG } from '../../img/icons/exportIcons'
import { changeUserProfile, deletePhotoThunk } from '../../store/slices/apiActions/userActions'
// @ts-ignore
import s from './Photo.module.css'

type TPprops = {
	photo: string
	id: string
}
const Photo: FC<TPprops> = ({ id, photo }) => {
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
				{/* <SVG.Dustbin
					className={s.button}
					onClick={() => delPhoto(id, photo)}
				/> */}
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

export default Photo