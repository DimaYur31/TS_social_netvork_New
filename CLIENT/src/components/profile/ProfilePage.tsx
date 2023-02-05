import React from 'react';
import { getUserData } from '../../api/userApi';
import { MyPosts } from '../homePage/myPosts/MyPosts';
import { useGetPageData } from '../../hooks/useGetPageDats';
import { MyInfo } from './myInfo/MyInfo';

const ProfilePage = () => {
	const { data: user, renderId, reload } = useGetPageData(2, getUserData);

	return (
		<section >
			{
				user && <>
					<MyInfo user={user} reload={reload} />
					<MyPosts _id={renderId} />
				</>
			}
		</section>
	);
};

export default React.memo(ProfilePage);