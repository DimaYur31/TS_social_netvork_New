import React from 'react'
import s from './Navbar.module.scss'

import Nav from './Nav'
import FriendList from '../friends/FriendList'

const Navbar = () => {
	return (
		<section className={s.navbar}>
			<Nav />
			<hr />
			<FriendList />
		</section>
	)
}

export default React.memo(Navbar)