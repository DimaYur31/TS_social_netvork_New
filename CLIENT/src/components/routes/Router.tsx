import { Suspense, lazy, useLayoutEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks';
import { selectIsAuth } from '../../selectors/selectors';
import { chechAuthUser } from '../../store/slices/apiActions/userActions';

import { Layout } from '../layout/Layout';
import { Authorization } from '../authorization/Authorization';
import { Loading } from '../elements/loading/Loading';

const HomePage = lazy(() => import('../homePage/HomePage'));
const DialogItem = lazy(() => import('../messenger/dialogItem/DialogItem'));
const UsersPage = lazy(() => import('../userspage/UsersPage'));
const ProfilePage = lazy(() => import('../profile/ProfilePage'));
const Photos = lazy(() => import('../photos/Photos'));
const Rooms = lazy(() => import('../rooms/Rooms'));
const Room = lazy(() => import('../rooms/Room'));
const PostPage = lazy(() => import('../postPage/PostPage'));
const Messenger = lazy(() => import('../messenger/Messenger'));

export const Router = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuth = useAppSelector(selectIsAuth);

	useLayoutEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/');
			return;
		}
		dispatch(chechAuthUser());
	}, [isAuth]);

	return (
		<div>
			{isAuth
				? <Routes>
					<Route path='/' element={<Layout />} >
						<Route index element={<Suspense fallback={<Loading />}><HomePage /></Suspense>} />
						<Route path='/users' element={<Suspense fallback={<Loading />}><UsersPage /></Suspense>} />
						<Route path='/post/:id' element={<Suspense fallback={<Loading />}><PostPage /></Suspense>} />
						<Route path='/profile/:id' element={
							<Suspense fallback={<Loading />}>
								<ProfilePage />
							</Suspense>} />
						<Route path='/photos' element={<Suspense fallback={<Loading />}><Photos /></Suspense>} />
						<Route path='/rooms' element={<Suspense fallback={<Loading />}><Rooms /></Suspense>} />
						<Route path='/rooms/:id' element={<Suspense fallback={<Loading />}><Room /></Suspense>} />
						<Route path='/messenger' element={<Suspense fallback={<Loading />}><Messenger /></Suspense>}>
							<Route path=':id' element={<Suspense fallback={<Loading />}><DialogItem /></Suspense>} />
						</Route>
						<Route path='*' element={<h2>Page not found</h2>} />
					</Route>
				</Routes>
				: <Routes>
					<Route path='/' element={<Authorization />} />
				</Routes>
			}
		</div>
	);
};