import { FC, useState } from 'react'
import s from './LikeDislikeComponent.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { dislikeThunk, likeThunk } from '../../../store/slices/apiActions/postActions'
import { SVG } from '../../../img/icons/exportIcons'

type LikeDislikePropsType = {
	likes: string[]
	dislikes: string[]
	currentObjectId: string
	currentObjectUserId: string
}

const LikeDislikeComponent: FC<LikeDislikePropsType> = (props) => {
	const dispatch = useAppDispatch()
	const { defaultUser } = useAppSelector(store => store.profilePage)
	const { likes, dislikes, currentObjectId, currentObjectUserId } = props
	const [isLiked, setIsLiked] = useState(likes.includes(defaultUser._id))
	const [isDisliked, setIsDisliked] = useState(dislikes.includes(defaultUser._id))

	const hendelLikes = () => {
		if (defaultUser._id !== currentObjectUserId) {
			dispatch(likeThunk(defaultUser._id, currentObjectId))
			setIsLiked(!isLiked)
			setIsDisliked(false)
		}
	}
	const hendelDislikes = () => {
		if (defaultUser._id !== currentObjectUserId) {
			dispatch(dislikeThunk(defaultUser._id, currentObjectId))
			setIsDisliked(!isDisliked)
			setIsLiked(false)
		}
	}

	return (
		<div className={s.statistic}>
			<span className={isLiked ? `${s.active}` : ''}
				onClick={() => hendelLikes()}
			><SVG.Like className={s.like} /></span>
			<p>{`${likes.length}`}</p>
			<span className={isDisliked ? `${s.active}` : ''}
				onClick={() => hendelDislikes()}
			><SVG.Dislike className={s.dislike} /></span>
			<p>{`${dislikes.length}`}</p>
		</div>
	)
}

export default LikeDislikeComponent