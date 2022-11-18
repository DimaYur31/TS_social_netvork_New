import { FC, MouseEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { SVG } from '../../../img/icons/exportIcons'
import { dislikeThunk, likeThunk } from '../../../store/slices/apiActions/postActions'
//@ts-ignore
import s from './LikeDislikeComponent.module.css'

type LikeDislikePropsType = {
	likes: string[]
	dislikes: string[]
	currentObjectId: string
}

const LikeDislikeComponent: FC<LikeDislikePropsType> = ({ likes, dislikes, currentObjectId }) => {
	const dispatch = useAppDispatch()
	const { defaultUser } = useAppSelector(store => store.profilePage)
	const [isLiked, setIsLiked] = useState(likes.includes(defaultUser._id))
	const [isDisliked, setIsDisliked] = useState(dislikes.includes(defaultUser._id))


	const hendelLikes = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault()
		dispatch(likeThunk(defaultUser._id, currentObjectId))
		setIsLiked(!isLiked)
		setIsDisliked(false)
	}
	const hendelDislikes = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault()
		dispatch(dislikeThunk(defaultUser._id, currentObjectId))
		setIsDisliked(!isDisliked)
		setIsLiked(false)
	}

	return (
		<div className={s.statistic}>
			<span className={isLiked ? `${s.active}` : ''}
				onClick={(e) => hendelLikes(e)}
			><SVG.Like className={s.like} /></span>
			<p>{`${likes.length}`}</p>
			<span className={isDisliked ? `${s.active}` : ''}
				onClick={(e) => hendelDislikes(e)}
			><SVG.Dislike className={s.dislike} /></span>
			<p>{`${dislikes.length}`}</p>
		</div>
	)
}

export default LikeDislikeComponent