import { FC } from 'react'
import { Link } from 'react-router-dom'
import { UserType } from '../../../types/profile'
import { getPhoto } from '../../../hooks/hooks'//@ts-ignore
import s from './userItem.module.css'

type propsType = {
	currentUser: UserType
}

const UsersItem: FC<propsType> = ({ currentUser }) => {
	const { avatar, surname, name } = currentUser
	return (
		<div className={s.usersItem}>
			<Link to={`/profile/:userId`}>
				<div className={s.image}>
					<img src={getPhoto(avatar)} />
				</div>
				<h3>{name}</h3>
				<h3>{surname}</h3>
			</Link>
			<div className={s.btns} >
				<span>follow</span>
				<span>message</span>
			</div>
		</div >
	)
}

export default UsersItem