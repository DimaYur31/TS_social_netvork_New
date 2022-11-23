import { FC, useState } from 'react'
import s from './ButtonsPopap.module.css'
import { PostType } from '../../../../types/post'
import { useAppSelector, useAppDispatch } from '../../../../hooks/reactReduxHooks'
import { deletePostThunk } from '../../../../store/slices/apiActions/postActions'
import { SVG } from '../../../../img/icons/exportIcons'

type TypeProps = {
	post: PostType<string>
}

const ButtonsPopap: FC<TypeProps> = ({ post }) => {
	const { defaultUser } = useAppSelector(store => store.profilePage)
	const dispatch = useAppDispatch()
	const [isOpend, setIsOpen] = useState(false)

	const handlePopap = () => {
		setIsOpen(!isOpend)
	}

	const deletePost = () => {
		if (post.img !== defaultUser.avatar) {
			dispatch(deletePostThunk(post._id))
		}
	}

	return <>
		<div className={s.wrapper}>

			<span onClick={handlePopap}><SVG.More /></span>
			{isOpend
				? <div className={s.buttons}>
					<span onClick={() => deletePost()}><SVG.Dustbin /></span>
				</div>
				: null
			}
		</div>
	</>
}

export default ButtonsPopap