import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFriendsThunk } from '../../store/slices/apiActions/usersActions';
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks';
import { selectDefaultUser, selectFriends } from '../../selectors/selectors';
import { UserItem } from '../elements/user-item/UserItem';
import style from './FriendList.module.scss';

export const FriendList = memo(function FriendList() {
	const dispatch = useAppDispatch();
	const { _id, followings } = useAppSelector(selectDefaultUser);
	const friends = useAppSelector(selectFriends);

	useEffect(() => {
		dispatch(getFriendsThunk(_id));
	}, [followings]);

	return (
		<ul className={style.list}>
			{friends.map((friend) => {
				return (
					<Link
						className={style.link}
						to={`/profile/${friend._id}`}
						key={friend._id}
					>
						<UserItem user={friend} />
					</Link>
				);
			})}
		</ul>
	);
});