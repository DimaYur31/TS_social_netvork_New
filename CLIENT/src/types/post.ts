export type CommentType = {
	_id: string
	postId: string
	commentatorId: string
	text: string
	likes: Array<string>
	dislikes: Array<string>
	createdAt: Date
	updatedAt: Date
}

export type PostType<T> = {
	_id: string
	userId: string
	text: string
	img: T
	likes: Array<string>
	dislikes: Array<string>
	comments: Array<string>
	createdAt: Date
	updatedAt: Date
}

export type CreatePostType = Pick<PostType<Blob>, 'userId' | 'text' | 'img'>

export type PostsTypeState = {
	posts: Array<PostType<string>>
}