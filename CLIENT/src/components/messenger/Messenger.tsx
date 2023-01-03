import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks'
import { getChatsThunk } from '../../store/slices/apiActions/chatActions'
import { selectDefaultUserId } from '../../selectors/selectors'
import s from './Messenger.module.scss'

import Conversations from './conversations/Conversations'
import DialogItem from './dialogItem/DialogItem'

const Messanger = () => {
	const dispatch = useAppDispatch()
	const _id = useAppSelector(selectDefaultUserId)

	useEffect(() => {
		dispatch(getChatsThunk(_id))
	}, [])

	return (
		<div className={s.messenger}>
			<Conversations />
			<DialogItem />
		</div>
	)
}

export default Messanger