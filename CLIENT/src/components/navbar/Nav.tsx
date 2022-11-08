import React from 'react'
import { NavLink } from 'react-router-dom'
import { SVG } from './../../img/icons/exportIcons'
//@ts-ignore
import s from './Navbar.module.css'
import { useAppSelector } from '../../hooks/reactReduxHooks';

interface ILink extends React.HTMLProps<HTMLLinkElement> {
	isActive: boolean
}

const Nav = () => {
	const { name } = useAppSelector(state => state.profilePage.defaultUser)
	const handlerActive = ({ isActive }: ILink) => (isActive ? s.active : 'link')

	return <nav className={s.nav} >
		<ul>
			<li>
				<NavLink to='/' className={handlerActive} >
					<SVG.Music className={s.icons} width='20' height='20' />
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to={`/profile/${name}`} className={handlerActive} >
					<SVG.Icon className={s.icons} width='20' height='20' />
					Profile
				</NavLink>
			</li>
			{/* <li>
				<NavLink to="/" className={handlerActive} >
					<SVG.Chat className={s.icons} width='20' height='20' />
					Messanges
				</NavLink>
			</li> */}
			<li>
				<NavLink to="/friends" className={handlerActive} >
					<SVG.Friends className={s.icons} width='20' height='20' />
					Friends
				</NavLink>
			</li>
			<li>
				<NavLink to="/users" className={handlerActive} >
					<SVG.Users className={s.icons} width='20' height='20' />
					Users
				</NavLink>
			</li>
			{/* <li>
				<NavLink to="/communities" className={handlerActive} >
					<SVG.Community className={s.icons} width='20' height='20' />
					Communities
				</NavLink>
			</li> */}
			<li>
				<NavLink to='/photos' className={handlerActive} >
					<SVG.Gallery className={s.icons} width='20' height='20' />
					Photos
				</NavLink>
			</li>
			<li>
				<NavLink to='/rooms' className={handlerActive} >
					<SVG.VideoCall className={s.icons} width='20' height='20' />
					Rooms
				</NavLink>
			</li>
			{/* <li>
				<NavLink to="/docs" className={handlerActive} >
					<SVG.Folder className={s.icons} width='20' height='20' />
					Docs
				</NavLink>
			</li> */}
		</ul>
	</nav>
}

export default Nav