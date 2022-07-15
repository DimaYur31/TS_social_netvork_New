import { useAppSelector } from '../../hooks/reactReduxHooks'
import { NavLink } from 'react-router-dom'
//@ts-ignore
import s from './Navbar.module.css'

const Navbar = () => {
	const { isAuth } = useAppSelector(state => state.profilePage)
	const handlerActive = ({ isActive }: ILink) => (isActive ? s.active : 'link')

	interface ILink extends React.HTMLProps<HTMLLinkElement> { isActive: boolean }

	return (
		<section className="navbar">
			<nav className={s.nav} >
				{isAuth
					? <ul>
						<li><NavLink to="/profile" className={handlerActive} >Profile</NavLink></li>
						<li><NavLink to="/dialogs" className={handlerActive} >Messanges</NavLink></li>
						<li><NavLink to="/friends" className={handlerActive} >Friends</NavLink></li>
						<li><NavLink to="/users" className={handlerActive} >Users</NavLink></li>
						<li><NavLink to="/communities" className={handlerActive} >Communities</NavLink></li>
						<li><NavLink to="/photos" className={handlerActive} >Photos</NavLink></li>
						<li><NavLink to="/videos" className={handlerActive} >videos</NavLink></li>
						<li><NavLink to="/music" className={handlerActive} >Music</NavLink></li>
						<li><NavLink to="/docs" className={handlerActive} >Docs</NavLink></li>
					</ul>
					: <ul>
						<li><NavLink to="/login" className={handlerActive} >Log in</NavLink></li>
						<li><NavLink to="/news" className={handlerActive} >News</NavLink></li>
						<li><NavLink to="/docs" className={handlerActive} >Docs</NavLink></li>
					</ul>
				}
			</nav>
		</section>
	)
}

export default Navbar
