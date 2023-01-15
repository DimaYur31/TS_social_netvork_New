import React from 'react'

import FriendList from '../friends/FriendList'

import s from './Navbar.module.scss'

import Nav from './Nav'

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