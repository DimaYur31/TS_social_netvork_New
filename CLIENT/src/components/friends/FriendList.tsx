import FriendItem from './FriendItem'//@ts-ignore
import s from './Friendlist.module.css'



const data = [
	{ id: 1, isOnline: true, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 2, isOnline: true, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 3, isOnline: false, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 4, isOnline: true, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 5, isOnline: false, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 6, isOnline: true, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 7, isOnline: false, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 8, isOnline: true, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 9, isOnline: false, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
	{ id: 10, isOnline: false, img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', name: 'Dima' },
]

const FriendList = () => {
	return <ul className={s.frienfList}>
		{
			data.map((item) => {
				return <FriendItem isOnline={item.isOnline} src={item.img} key={item.id}>{item.name}</FriendItem>
			})
		}

	</ul>

}

export default FriendList