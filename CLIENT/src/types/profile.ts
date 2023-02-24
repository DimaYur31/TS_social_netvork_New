export type UserType = {
	_id: string
	email: string
	password: string
	name: string
	surname: string
	// status: string
	avatar: string
	coverPicture: string
	birthday: string
	country: string
	city: string
	job: string
	languages: Array<string>
	photos: Array<string>
	followers: Array<string>
	followings: Array<string>
}

export type ProfileType = {
	defaultUser: UserType
	isAuth: boolean
}


// export type UsersType = Omit<UserType, 'email' | 'password'>
export type UsersType = Pick<UserType, '_id' | 'name' | 'avatar'>

export type UserChanges = {
	// email?: string
	password?: string
	name?: string
	surname?: string
	// status?: string
	coverPicture?: string
	avatar?: string
	birthday?: string
	country?: string
	city?: string
	job?: string
	languages?: string
	// photos?: string
}