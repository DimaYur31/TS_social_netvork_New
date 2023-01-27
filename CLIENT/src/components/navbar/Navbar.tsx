import { memo } from 'react'

import { FriendList } from '../friends/FriendList'

import s from './Navbar.module.scss'

import Nav from './Nav'

export const Navbar = memo(() => {
	return (
		<section className={s.navbar}>
			<Nav />
			<hr />
			<FriendList />
		</section>
	)
})