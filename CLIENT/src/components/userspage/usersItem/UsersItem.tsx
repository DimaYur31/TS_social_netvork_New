import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserType } from '../../../types/profile'
import { usePhotosPath } from '../../../hooks/hooks'
import { useAppSelector, useAppDispatch } from '../../../hooks/reactReduxHooks'
import { selectChats, selectDefaultUserId } from '../../../selectors/selectors'
import { createConversationThunc } from '../../../store/slices/apiActions/chatActions'
import { SVG } from '../../../img/icons/exportIcons'
import { setCurrentChat } from '../../../store/slices/chatSlice'
import FollowButton from '../../elements/btn/isFollow/FolLowButton'

import s from './userItem.module.scss'

type propsType = {
	thisUser: UserType
}

const UsersItem: FC<propsType> = ({ thisUser }) => {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const chats = useAppSelector(selectChats)
	const senderId = useAppSelector(selectDefaultUserId)
	const { avatar, surname, name, _id: receiverId } = thisUser

	const getChat = async () => {
		let chat = null
		if (!chats.length) {
			const id = await dispatch(createConversationThunc(senderId, receiverId))
			dispatch(setCurrentChat(id))
			navigate(`/messenger/${id}`)
			return
		}

		for (let i = 0; i < chats.length; i++) {
			if (chats[i].members.includes(receiverId)) {
				chat = chats[i]
				break
			}
		}

		if (chat) {
			navigate(`/messenger/${chat._id}`)
			dispatch(setCurrentChat(chat._id))
			return
		}

		dispatch(createConversationThunc(senderId, receiverId))
			.then(id => {
				navigate(`/messenger/${id}`)
				dispatch(setCurrentChat(id))
			})
	}

	return (
		<div className={s.usersItem}>
			<Link to={`/profile/${receiverId}`}>
				<div className={s.image}>
					<img src={usePhotosPath(avatar)} alt='avatar' />
				</div>
				<h3>{name}</h3>
				<h3>{surname}</h3>
			</Link>
			<div className={s.btns} >
				<FollowButton currentUserId={thisUser._id} />
				<span onClick={() => getChat()}><SVG.AddChat /></span>
			</div>
		</div >
	)
}

export default UsersItem