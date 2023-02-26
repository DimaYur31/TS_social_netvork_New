import { FriendList } from '../friends/FriendList';
import { Nav } from './Nav';
import style from './Navbar.module.scss';

export const Navbar = () => {
	return (
		<section className={style.navbar}>
			<Nav />
			<FriendList />
		</section>
	);
};