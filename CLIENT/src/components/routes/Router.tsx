import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loading } from '../elements/loading/Loading';
import { HomePage } from '../homePage/HomePage';
import { DialogItem } from '../messenger/dialogItem/DialogItem';
import { Layout } from '../layout/Layout';
import { Authorization } from '../authorization/Authorization';

// const Authorization = lazy(() => import('../authorization/Authorization'));
const UsersPage = lazy(() => import('../userspage/UsersPage'));
const ProfilePage = lazy(() => import('../profile/ProfilePage'));
const Photos = lazy(() => import('../photos/Photos'));
const Rooms = lazy(() => import('../rooms/Rooms'));
const Room = lazy(() => import('../rooms/Room'));
const PostPage = lazy(() => import('../postPage/PostPage'));
const Messenger = lazy(() => import('../messenger/Messenger'));

export const Router = ({ isAuth }: { isAuth: boolean }) => {
	return (
		<div>
			{isAuth
				? <Routes>
					<Route path='/' element={<Suspense fallback={<Loading />}><Layout /></Suspense>} >
						<Route index element={<HomePage />} />
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
							<Route path=':id' element={<DialogItem />} />
						</Route>
						<Route path='*' element={<h2>Page not found</h2>} />
					</Route>
				</Routes>
				: <Routes>
					<Route path='/' element={<Suspense fallback={<Loading />}><Authorization /></Suspense>} />
					<Route path='/login' element={
						<Suspense fallback={<Loading />}>
							<Navigate to='/' replace />
						</Suspense>} />
				</Routes>
			}
		</div>
	);
};