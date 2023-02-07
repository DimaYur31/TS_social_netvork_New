import { memo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/reactReduxHooks';
import { followUnfollowThunk } from '../../../../store/slices/apiActions/userActions';
import { SVG } from '../../../../img/icons/exportIcons';
import style from './FollowButton.module.scss';

type TypeProps = {
	currentUserId: string
}

export const FollowButton = memo(({ currentUserId }: TypeProps) => {
	const dispatch = useAppDispatch();
	const { followings, _id } = useAppSelector(state => state.profilePage.defaultUser);
	const [isFollowed, setIsFollowed] = useState(followings.includes(currentUserId));

	const activeClass = isFollowed && `${style.isActive}`;

	const handleFollowed = () => {
		dispatch(followUnfollowThunk(_id, currentUserId, isFollowed))
			.then((fallowed) => setIsFollowed(fallowed));
	};

	return (
		<button
			className={`${style.buttonFollowed} ${activeClass}`}
			onClick={handleFollowed}
		>
			<SVG.Subscribe />
		</button>
	);
});