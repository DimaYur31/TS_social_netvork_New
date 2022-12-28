import React, { ReactNode } from 'react'
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

const LinkItem: React.FC<LinkItemProps> = ({ to, title, children }) => {

	const handlerActive = ({ isActive }: ILink) => (isActive && s.active)

	return <li>
		<NavLink to={to} className={handlerActive} >
			{children}
			{title}
		</NavLink>
	</li>
}

export default React.memo(LinkItem)