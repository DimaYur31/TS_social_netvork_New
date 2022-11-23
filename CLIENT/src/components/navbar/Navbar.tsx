import Nav from './Nav'
import FriendList from '../friends/FriendList'
import s from './Navbar.module.css'

const Navbar = () => {
	return (
		<section className={s.navbar}>
			<Nav />
			<hr />
			<FriendList />
		</section>
	)
}

export default Navbar
