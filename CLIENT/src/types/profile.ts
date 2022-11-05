export type UserType = {
	_id: string,
	email: string,
	password: string,
	name: string,
	surname: string,
	status: ''//string | null,
	avatar: string,
	coverPicture: string,
	birthday: '',//string | null,
	country: '',//string | null,
	city: '',//string | null,
	job: '',//string | null,
	languages: Array<string>,
	photos: Array<string>,
	// posts: [] as Array<PoastType> | null,
	followers: Array<number>,
	followings: Array<number>,
}

export type ProfileType = {
	defaultUser: UserType,
	isAuth: boolean
}

export type UserChanges = {
	// email?: string,
	password?: string,
	name?: string,
	surname?: string,
	// status?: string
	avatar?: string,
	birthday?: string
	country?: string
	city?: string
	job?: string
	languages?: string
	// photos?: string
}