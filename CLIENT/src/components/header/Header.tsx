import { MouseEvent, memo } from 'react'
import { Link } from 'react-router-dom'

import { usePhotosPath } from '../../hooks/hooks'
import { profileActionst } from '../../store/slices/profileSlice'
import { SVG } from '../../img/icons/exportIcons'
import { selectDefaultUserName } from '../../selectors/selectors'
import { SmalAvatar } from '../styleedComponents/SmalAvatar'
import { LightDarkCheckbox } from '../elements/checkbox/light-dark/LightDarkCheckbox'

import { useAppDispatch, useAppSelector } from './../../hooks/reactReduxHooks'
import s from './Header.module.scss'

export const Header = memo(() => {
	const dispatch = useAppDispatch()
	const name = useAppSelector(selectDefaultUserName)
	const avatar = usePhotosPath()

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

			<div className={s.info}>
				<div className={s.user}>
					<SmalAvatar src={avatar} />
					<p>{name}</p>
				</div>

				<div className={s.btns}>
					<LightDarkCheckbox />
					<button onClick={exit}><SVG.Exit /></button>
				</div>

			</div>
		</header >
	)
})