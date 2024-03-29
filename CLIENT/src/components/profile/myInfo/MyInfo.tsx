import { memo } from 'react';
import { usePhotosPath, useIsOwner } from '../../../hooks/hooks';
import { UserType } from '../../../types/profile';
import { AddPostPopap } from '../../elements/popap/AddPostPopap';
import { FollowButton } from '../../elements/btn/isFollow/FolLowButton';
import { About } from './about/About';
import style from './MyInfo.module.scss';

type MyInfoProps = {
	user: UserType
	reload: () => void
}

export const MyInfo = memo(function MyInfo({ user, reload }: MyInfoProps) {
	const isOwner = useIsOwner(user._id);
	const photo = usePhotosPath(user.coverPicture);

	return (
		<div
			className={style.user}
			style={{ '--my-phon': `url(${photo})` } as React.CSSProperties}
		>
			<div className={style.info} >
				<img src={usePhotosPath(user.avatar)} alt='avatar' />
				<About user={user} reload={reload} />
			</div>
			{isOwner
				? <AddPostPopap />
				: <FollowButton currentUserId={user._id} />
			}
		</div>
	);
});