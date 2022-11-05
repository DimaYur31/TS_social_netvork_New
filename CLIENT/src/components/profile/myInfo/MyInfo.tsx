import { useEffect } from 'react'
//@ts-ignore
import s from './MyInfo.module.css'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { getPhoto, useAvatar } from '../../../hooks/hooks'
import { userExit } from '../../../store/slices/profileSlice'
import { useNavigate } from 'react-router-dom'
import Button from '../../styleedComponents/Button'

const MyInfo: React.FC = () => {
	const { defaultUser, isAuth } = useAppSelector(state => state.profilePage)
	const dispatch = useAppDispatch()
	const avatar = useAvatar()

	const navigate = useNavigate()

	const exit = (e: React.MouseEvent) => {
		e.preventDefault()
		dispatch(userExit())
		window.location.reload();
	}

	useEffect(() => {
		if (!isAuth) {
			navigate('/login')
		}
	}, [isAuth])

	return (
		<div className={s.user}>
			<div>
				<img src={getPhoto(defaultUser.coverPicture)} />
			</div>

			<div className={s.info} >
				<img src={avatar} />
				<h3>{`${defaultUser.name} ${defaultUser.surname}`}</h3>
				{/* <Status status={defaultUser.status} /> */}
			</div>



			<Button clik={exit}>Exit</Button>
		</div>
	)
}

export default MyInfo