import React from 'react'

import { useAppSelector } from '../../hooks/reactReduxHooks'
import { selectDefaultUserId } from '../../selectors/selectors'

import s from './Navbar.module.scss'
import { SVG } from './../../img/icons/exportIcons'

import LinkItem from './LinkItem'

const Nav = () => {
	const _id = useAppSelector(selectDefaultUserId)

	return <nav className={s.nav} >
		<ul>
			<LinkItem to={'/'} title='Home'>
				<SVG.Home className={s.icons} />
			</LinkItem>

			<LinkItem to={`/profile/${_id}`} title='Profile'>
				<SVG.Icon className={s.icons} />
			</LinkItem>

			{/* <LinkItem to='/friends' title='Friends'>
				<SVG.Friends className={s.icons} />
			</LinkItem> */}

			<LinkItem to='/users' title='Users'>
				<SVG.Users className={s.icons} />
			</LinkItem>

			<LinkItem to='/messenger' title='Messenger'>
				<SVG.Community className={s.icons} />
			</LinkItem>

			<LinkItem to='/photos' title='Photos'>
				<SVG.Gallery className={s.icons} />
			</LinkItem>

			<LinkItem to='/rooms' title='Rooms'>
				<SVG.VideoCall className={s.icons} />
			</LinkItem>
		</ul>
	</nav>
}

export default React.memo(Nav)