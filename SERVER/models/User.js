const { Schema, model } = require('mongoose');

const User = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, min: 4 },
	name: { type: String, required: true, max: 20 },
	surname: { type: String, max: 20 },
	status: { type: String, max: 80 },
	avatar: { type: String, default: 'defaultAvatar.png' },
	coverPicture: { type: String, default: 'defaultCover.png' },
	birthday: { type: String, default: '' },
	country: { type: String, default: '' },
	city: { type: String, default: '' },
	job: { type: String, default: '' },
	languages: { type: Array },
	photos: { type: Array },
	// friend: { type: ObjectId, ref: 'User' },
	followers: { type: Array },
	followings: { type: Array },
	isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = model('User', User);