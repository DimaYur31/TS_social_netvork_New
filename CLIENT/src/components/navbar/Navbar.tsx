import { memo } from 'react';
import { FriendList } from '../friends/FriendList';
import { Nav } from './Nav';
import style from './Navbar.module.scss';

export const Navbar = memo(function Navbar() {
	return (
		<section className={style.navbar}>
			<Nav />
			<FriendList />
		</section>
	);
});