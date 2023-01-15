import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './../../hooks/reactReduxHooks'
import { usePhotosPath } from '../../hooks/hooks'
import { userExit } from '../../store/slices/profileSlice'
import { SVG } from '../../img/icons/exportIcons'
import { selectDefaultUserName } from '../../selectors/selectors'
import s from './Header.module.scss'

import SmalAvatar from '../styleedComponents/SmalAvatar'

const Header = () => {
	const dispatch = useAppDispatch()
	const name = useAppSelector(selectDefaultUserName)
	const avatar = usePhotosPath()

	const exit = (e: React.MouseEvent) => {
		e.preventDefault()
		dispatch(userExit())
		window.location.reload()
	}

	return (
		<header className={s.header} >
			<Link to={`/`}>
				<h1>V_Komnate</h1>
			</Link>

			<div className={s.autorisation}>
				<div className={s.btns}>
					<NavLink to={'/'}><SVG.Home /></NavLink>
					<button onClick={exit}><SVG.Exit /></button>
				</div>

				<div className={s.user}>
					<div>{name}</div>
					<SmalAvatar src={avatar} />
				</div>
			</div>
		</header >
	)
}

export default React.memo(Header)