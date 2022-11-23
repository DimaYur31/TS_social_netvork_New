import s from './Messanger.module.css'

import Input from '../elements/input/Input'
import UserItem from '../elements/user-item/UserItem'
import Button from '../styleedComponents/Button'
import ChatBox from './chatBox/ChatBox'

const conversetionsData = [
	{ _id: '1', avatar: 'https://cdn0.youla.io/files/images/360_360/60/a8/60a8d291f985d749fb24f7f5-1.jpg', name: 'Oleg' },
	{ _id: '2', avatar: 'https://cdn0.youla.io/files/images/360_360/60/a8/60a8d291f985d749fb24f7f5-1.jpg', name: 'Sveta' },
	{ _id: '3', avatar: 'https://cdn0.youla.io/files/images/360_360/60/a8/60a8d291f985d749fb24f7f5-1.jpg', name: 'Masha' },
	{ _id: '4', avatar: 'https://cdn0.youla.io/files/images/360_360/60/a8/60a8d291f985d749fb24f7f5-1.jpg', name: 'Dima' },
	{ _id: '5', avatar: 'https://cdn0.youla.io/files/images/360_360/60/a8/60a8d291f985d749fb24f7f5-1.jpg', name: 'Sergey' },
]

const Messanger = () => {
	return (
		<div className={s.messanger}>
			<div >
				{
					conversetionsData.map(item => {
						return <UserItem user={item} key={item._id} isDB={false} />
					})
				}
			</div>

			<div className={s.list}>
				<ChatBox />
				<div className={s.panel} >
					<Input />
					<Button onClick={() => null}>Send</Button>
				</div>
			</div>
		</div>
	)
}

export default Messanger