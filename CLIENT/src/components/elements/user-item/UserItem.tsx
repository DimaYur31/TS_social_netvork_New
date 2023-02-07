import { memo } from 'react';
import { usePhotosPath } from '../../../hooks/hooks';
import { UsersType } from '../../../types/profile';
import { IsOnline } from '../../styleedComponents/IsOnline';
import { SmalAvatar } from '../../styleedComponents/SmalAvatar';
import style from './UserItem.module.scss';

interface UserItemProps {
	user: UsersType
	isDB?: boolean
}

export const UserItem = memo(({ user, isDB }: UserItemProps) => {

	return (
		<li className={style.list}>
			<SmalAvatar src={usePhotosPath(user.avatar, isDB)} />
			<IsOnline isOnline={false} />
			<p>
				{user.name}
			</p>
		</li>
	);
});