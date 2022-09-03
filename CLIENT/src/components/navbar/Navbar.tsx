
import FriendList from '../friends/FriendList'
import Nav from './Nav'
//@ts-ignore
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
