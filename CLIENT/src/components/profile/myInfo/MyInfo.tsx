import { useEffect, useState } from 'react'
//@ts-ignore
import s from './MyInfo.module.css'
// import Loading from '../../elements/loading/Loading'
import Status from './Status'
import { useAppDispatch, useAppSelector } from '../../../hooks/reactReduxHooks'
import { useAvatar } from '../../../hooks/hooks'
import { userExit } from '../../../store/slices/profileSlice'
import { useNavigate } from 'react-router-dom'

const MyInfo: React.FC = () => {
	const { defaultUser, isAuth } = useAppSelector(state => state.profilePage)
	const dispatch = useAppDispatch()
	const avatar = useAvatar()
	// const [file, setFile] = useState([])
	const navigate = useNavigate()

	const exit = (e: React.MouseEvent) => {
		e.preventDefault()
		dispatch(userExit())
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
			{/* <input type="file" name="" id={s.imgId} */}
			{/* onClick={(e) => selectFile(e)} */}
			{/* /> */}
			{/* <label htmlFor={s.imgId}> */}
			<img src={avatar} />
			{/* </label> */}

			<div>
				<div>
					<h3>{`${defaultUser.name} ${defaultUser.surname}`}</h3>
					<Status status={defaultUser.status} />
				</div>

				<ul>
					<li><span>Birthday:</span> {defaultUser.birthday}</li>
					<li><span>Hometowen:</span> {defaultUser.city}</li>
					<li><span>Country:</span> {defaultUser.country}</li>
					<li><span>Company:</span> {defaultUser.work}</li>
					<li><span>Languages:</span> {defaultUser.languages.join(', ')}</li>
				</ul>
			</div>
			<button onClick={(e) => { exit(e) }}>EXIT</button>
		</div>
	)
}

export default MyInfo