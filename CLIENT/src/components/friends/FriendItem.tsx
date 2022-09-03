import React from 'react'
import SmalAvatar from '../styleedComponents/SmalAvatar'
import IsOnline from '../styleedComponents/IsOnline'

interface IProps {
	src: string
	children: React.ReactNode
	isOnline: boolean
}

const FriendItem: React.FC<IProps> = ({ src, children, isOnline }) => {
	return <li>
		<SmalAvatar src={src} />
		<IsOnline isOnline={isOnline} />
		{children}
	</li>
}

export default FriendItem