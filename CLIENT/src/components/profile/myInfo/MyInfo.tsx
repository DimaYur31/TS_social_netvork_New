import { useEffect, useState } from 'react'
//@ts-ignore
import s from './MyInfo.module.css'
// import Loading from '../../elements/loading/Loading'
import Status from './Status'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { useAvatar } from '../../../hooks/hooks'
import { userExit } from '../../../store/slices/profileSlice'
import { useNavigate } from 'react-router-dom'
import Button from '../../styleedComponents/Button'

const MyInfo: React.FC = () => {
	const { defaultUser, isAuth } = useAppSelector(state => state.profilePage)
	const dispatch = useAppDispatch()
	const avatar = useAvatar()
	const bgPhon = 'https://vjoy.cc/wp-content/uploads/2019/07/1-1.jpg'
	// const [file, setFile] = useState([])
	const navigate = useNavigate()

	const exit = (e: React.MouseEvent) => {
		e.preventDefault()
		dispatch(userExit())
		window.location.reload();
	}

	// const selectFile = (e:React.ChangeEvent<HTMLSelectElement>) => {
	// setFile(e.target.files[0])
	// }
	useEffect(() => {
		if (!isAuth) {
			navigate('/login')
		}
	}, [isAuth])

	return (
		<div className={s.user}>
			<div>
				<img src={bgPhon} />
			</div>

			<div className={s.info} >
				<img src={avatar} />
				<h3>{`${defaultUser.name} ${defaultUser.surname}`}</h3>
				<Status status={defaultUser.status} />
			</div>



			<Button exit={exit}>Exit</Button>
		</div>
	)
}

export default MyInfo