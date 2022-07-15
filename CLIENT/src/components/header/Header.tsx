import { NavLink } from 'react-router-dom'
import { useAvatar } from '../../hooks/hooks'
import { useAppSelector } from '../../hooks/reactReduxHooks'
//@ts-ignore
import s from './Header.module.css'

const Header = () => {
	const { defaultUser, isAuth } = useAppSelector((state) => state.profilePage)
	const avatar = useAvatar()

	return (
		<header className={s.header} >
			<h1>VKomnate</h1>

			<div className={s.search}>
				<input type="text" />
			</div>

			{isAuth
				? <div className={s.autorisation}>
					<div>
						<span>mails</span>
						<span>meseges</span>
						<span>piople</span>
					</div>

					<div className={s.user}>
						<img src={avatar} alt="" />
						{/* <p>{defaultUser.name}</p> */}
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