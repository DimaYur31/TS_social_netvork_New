import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './../../hooks/reactReduxHooks'
import { usePhotosPath } from '../../hooks/hooks'
import { userExit } from '../../store/slices/profileSlice'
import { SVG } from '../../img/icons/exportIcons'
import { selectProfileState } from '../../selectors/selectors'
import s from './Header.module.scss'

import SmalAvatar from '../styleedComponents/SmalAvatar'

const Header = () => {
	const dispatch = useAppDispatch()
	const { isAuth, defaultUser } = useAppSelector(selectProfileState)
	const avatar = usePhotosPath()

	const exit = (e: React.MouseEvent) => {
		e.preventDefault()
		dispatch(userExit())
		window.location.reload();
	}

	console.log('Header render')
	return (
		<header className={s.header} >
			<Link to={`/${defaultUser._id}`}>
				<h1>V_Komnate</h1>
			</Link>

			{isAuth
				? <div className={s.autorisation}>
					<div className={s.btns}>
						<NavLink to={`/${defaultUser._id}`}><SVG.Home /></NavLink>
						<button onClick={exit}><SVG.Exit /></button>
					</div>

					<div className={s.user}>
						<div>{defaultUser.name}</div>
						<SmalAvatar src={avatar} />
					</div>
				</div>
				: <div className={s.login}>
					<NavLink to={'/login'}>Log in</NavLink>
				</div>
			}
		</header >
	)
}

export default React.memo(Header)