import { FC, useState } from 'react'

import { PostType } from '../../../../types/post'
import { useAppSelector, useAppDispatch } from '../../../../hooks/reactReduxHooks'
import { deletePostThunk } from '../../../../store/slices/apiActions/postActions'
import { selectDefaultUserId } from '../../../../selectors/selectors'
import { SVG } from '../../../../img/icons/exportIcons'

import s from './ButtonsPopap.module.scss'

type TypeProps = {
	post: PostType<string>
}

const ButtonsPopap: FC<TypeProps> = ({ post }) => {
	const _id = useAppSelector(selectDefaultUserId)
	const dispatch = useAppDispatch()
	const [isOpend, setIsOpen] = useState(false)

	const handlePopap = () => {
		setIsOpen(!isOpend)
	}

	const deletePost = () => {
		if (post.userId === _id) dispatch(deletePostThunk(post._id))
	}

	return (
		<div className={s.wrapper}>
			<span onClick={handlePopap}><SVG.More /></span>
			{isOpend &&
				<div className={s.buttons}>
					<span onClick={() => deletePost()}><SVG.Dustbin /></span>
				</div>
			}
		</div>
	)
}

export default ButtonsPopap