import Btn1 from '../../elements/btn/Btn1'
import Post from './post/Post'//@ts-ignore
import s from './MyPosts.module.css'

const posts = [
	{ id: 1, postImg: 'https://avatars.mds.yandex.net/i?id=b30d2cd10b91403f5f305bc500a60155-5427399-images-thumbs&n=13', text: 'firs post.', timeago: '5', likes: 5, coments: 10 },
	{ id: 2, postImg: 'https://avatars.mds.yandex.net/i?id=b30d2cd10b91403f5f305bc500a60155-5427399-images-thumbs&n=13', text: 'firs post.', timeago: '5', likes: 5, coments: 10 },
	{ id: 3, postImg: 'https://avatars.mds.yandex.net/i?id=b30d2cd10b91403f5f305bc500a60155-5427399-images-thumbs&n=13', text: 'firs post.', timeago: '5', likes: 5, coments: 10 },
	{ id: 4, postImg: 'https://avatars.mds.yandex.net/i?id=b30d2cd10b91403f5f305bc500a60155-5427399-images-thumbs&n=13', text: 'firs post.', timeago: '5', likes: 5, coments: 10 },
	{ id: 5, postImg: 'https://avatars.mds.yandex.net/i?id=b30d2cd10b91403f5f305bc500a60155-5427399-images-thumbs&n=13', text: 'firs post.', timeago: '5', likes: 5, coments: 10 },
]



// const MyPosts = ({ User, User: { posts, inputPostText }, addPost, newPostText }) => {
const MyPosts = () => {

	return (
		<div className={s.posts}>
			{posts.length == 0
				? <h2>Add Your Posts</h2>
				: <div>{
					posts.map(post => {
						return <Post key={post.id} post={post} />
					})
				}</div>
			}
		</div>
	)
}

export default MyPosts