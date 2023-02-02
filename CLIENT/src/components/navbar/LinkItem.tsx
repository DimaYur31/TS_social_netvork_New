import { ReactNode, memo } from 'react'
import { NavLink } from 'react-router-dom'

import s from './Navbar.module.scss'

interface ILink extends React.HTMLProps<HTMLLinkElement> {
	isActive: boolean
}

interface LinkItemProps {
	to: string
	title: string
	children: ReactNode
}

export const LinkItem = memo(({ to, title, children }: LinkItemProps) => {

	const handlerActive = ({ isActive }: ILink) => (isActive ? s.active : null)

	return <li>
		<NavLink to={to} className={handlerActive} >
			{children}
			<span>{title}</span>
		</NavLink>
	</li>
})