import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reactReduxHooks'
import { useAvatar } from '../../hooks/hooks'

import Search from '../styleedComponents/Search'
import SmalAvatar from '../styleedComponents/SmalAvatar'
//@ts-ignore
import s from './Header.module.css'

const Header = () => {
	const { isAuth, defaultUser } = useAppSelector((state) => state.profilePage)
	const avatar = useAvatar()

	return (
		<header className={s.header} >
			<Link to='/'>
				<h1>V_Komnate</h1>
			</Link>

			<Search />

			{isAuth
				? <div className={s.autorisation}>
					<div>
						<NavLink to={'/'}>Homepage</NavLink>
						<NavLink to={'/rooms'}>TimeLine</NavLink>
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

export default Header