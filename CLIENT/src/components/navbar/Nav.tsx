import { memo } from 'react'
import { useAppSelector } from '../../hooks/reactReduxHooks'
import { selectDefaultUserId } from '../../selectors/selectors'
import { LinkItem } from './LinkItem'
import { SVG } from './../../img/icons/exportIcons'
import style from './Navbar.module.scss'

export const Nav = memo(() => {
	const _id = useAppSelector(selectDefaultUserId)

	return <nav className={style.nav} >
		<ul>
			<LinkItem to={'/'} title='Home'>
				<SVG.Home className={style.icons} />
			</LinkItem>

			<LinkItem to={`/profile/${_id}`} title='Profile'>
				<SVG.Icon className={style.icons} />
			</LinkItem>

			<LinkItem to='/users' title='Users'>
				<SVG.Users className={style.icons} />
			</LinkItem>

			<LinkItem to='/messenger' title='Messenger'>
				<SVG.Community className={style.icons} />
			</LinkItem>

			<LinkItem to='/photos' title='Photos'>
				<SVG.Gallery className={style.icons} />
			</LinkItem>

			<LinkItem to='/rooms' title='Rooms'>
				<SVG.VideoCall className={style.icons} />
			</LinkItem>
		</ul>
	</nav>
})