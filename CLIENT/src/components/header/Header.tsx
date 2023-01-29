import { MouseEvent, memo } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { usePhotosPath } from '../../hooks/hooks'
import { profileActionst } from '../../store/slices/profileSlice'
import { SVG } from '../../img/icons/exportIcons'
import { selectDefaultUserName } from '../../selectors/selectors'

import { SmalAvatar } from '../styleedComponents/SmalAvatar'
import { useTheme } from '../../hooks/useTheme'

import { useAppDispatch, useAppSelector } from './../../hooks/reactReduxHooks'

import s from './Header.module.scss'


export const Header = memo(() => {
	const dispatch = useAppDispatch()
	const name = useAppSelector(selectDefaultUserName)
	const avatar = usePhotosPath()
	const { theme, setTheme } = useTheme()

	const exit = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(profileActionst.userExit())
		window.location.reload()
	}

	return (
		<header className={s.header} >
			<Link to={'/'}>
				<h1>V_Komnate</h1>
			</Link>

			<div className={s.autorisation}>
				<div className={s.btns}>
					<NavLink to={'/'}><SVG.Home /></NavLink>
					<button onClick={exit}><SVG.Exit /></button>
					<button onClick={() => setTheme('light')}>Light</button>
					<button onClick={() => setTheme('dark')}>Dark</button>
				</div>

				<div className={s.user}>
					<div>{name}</div>
					<SmalAvatar src={avatar} />
				</div>
			</div>
		</header >
	)
})