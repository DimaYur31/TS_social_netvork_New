import { ChangeEvent, FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reactReduxHooks'
import { createPostThunk } from '../../../../store/slices/apiActions/postActions'
import Button from '../../../styleedComponents/Button'
//@ts-ignore
import s from './AddPost.module.css'

type typeProps = {
	onClose: () => void
}

const AddPost: FC<typeProps> = ({ onClose }) => {
	const dispatch = useAppDispatch()
	const { _id } = useAppSelector(store => store.profilePage.defaultUser)
	const [text, setText] = useState('')
	const [img, setImg] = useState<Blob>()

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImg(e.target.files[0])
		}
	}

	const createPost = () => {
		if (text && img) {
			dispatch(createPostThunk(_id, text, img))
			onClose()
		}
	}

	return (
		<div className={s.wrapper}>
			<textarea
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
					setText(e.target.value.trim())
				}}
			/>
			<label htmlFor='post-photo'>
				<span>Выбрать фото</span>
				<input
					id='post-photo'
					onChange={selectFile}
					type="file"
					accept='image/*,.png,.jpg,.gif,.web'
				/>
			</label>
			<Button clik={createPost}>Send</Button>
		</div>
	)
}

export default AddPost