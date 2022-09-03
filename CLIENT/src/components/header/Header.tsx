import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reactReduxHooks'
import { useAvatar } from '../../hooks/hooks'

import Search from '../styleedComponents/Search'
import SmalAvatar from '../styleedComponents/SmalAvatar'
//@ts-ignore
import s from './Header.module.css'

const Header = () => {
	const { isAuth } = useAppSelector((state) => state.profilePage)
	const avatar = useAvatar()

	return (
		<header className={s.header} >
			<h1>V _ Komnate</h1>

			<Search />

			{isAuth
				? <div className={s.autorisation}>
					<div>
						<NavLink to={'/'}>Homepage</NavLink>
						<NavLink to={'/rooms'}>TimeLine</NavLink>
					</div>

					<div className={s.user}>
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

export default Header