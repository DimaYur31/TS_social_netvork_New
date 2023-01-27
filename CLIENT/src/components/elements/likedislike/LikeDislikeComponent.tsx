import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { dislikeThunk, likeThunk } from '../../../store/slices/apiActions/postActions'
import { SVG } from '../../../img/icons/exportIcons'

import s from './LikeDislikeComponent.module.scss'

type LikeDislikeProps = {
	likes: string[]
	dislikes: string[]
	currentObjectId: string
	currentObjectUserId: string
}

export const LikeDislikeComponent = (props: LikeDislikeProps) => {
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
			<span
				className={isLiked ? `${s.active}` : ''}
				onClick={() => hendelLikes()}
			>
				<SVG.Like className={s.like} />
			</span>
			<p>
				{`${likes.length}`}
			</p>
			<span
				className={isDisliked ? `${s.active}` : ''}
				onClick={() => hendelDislikes()}
			>
				<SVG.Dislike className={s.dislike} />
			</span>
			<p>
				{`${dislikes.length}`}
			</p>
		</div>
	)
}