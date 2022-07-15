import Btn1 from '../../elements/btn/Btn1';
import s from './MyPosts.module.css';
import Post from './post/Post';

const MyPosts = ({ User, User: { posts, inputPostText }, addPost, newPostText }) => {
	const postsElements = posts.map(post => {// posts list
		return <Post key={post.id} post={post} user={User} />
	})

	let newText = (e) => {
		let text = e.target.value
		newPostText(text)
	}

	return (
		<div className={s.posts}>
			<h3>My posts <span>{posts.length}</span></h3>

			<div>
				<input
					value={inputPostText}
					onChange={newText}
				/>

				<Btn1 text='Add' onClick={addPost} />
			</div>

			{posts.length == 0
				? <h2>Add Your Posts</h2>
				: <div>{postsElements}</div>
			}
		</div>
	)
}

export default MyPosts;