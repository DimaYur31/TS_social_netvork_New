import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from './Header.module.scss'
import { useAppDispatch, useAppSelector } from './../../hooks/reactReduxHooks'
import { useAvatar } from '../../hooks/hooks'
import { userExit } from '../../store/slices/profileSlice'
import { SVG } from '../../img/icons/exportIcons'

import Search from '../styleedComponents/Search'
import SmalAvatar from '../styleedComponents/SmalAvatar'
import { selectProfileState } from '../../selectors/selectors'

const Header = () => {
	const dispatch = useAppDispatch()
	const { isAuth, defaultUser } = useAppSelector(selectProfileState)
	const avatar = useAvatar(defaultUser.avatar)

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

			<Search />

			{isAuth
				? <div className={s.autorisation}>
					<div className={s.btns}>
						<NavLink to={`/${defaultUser._id}`}><SVG.Home /></NavLink>
						<NavLink to={'/rooms'}>TimeLine</NavLink>
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