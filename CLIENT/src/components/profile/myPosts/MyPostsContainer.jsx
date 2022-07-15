import { compose } from 'redux';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { addPost, newPostText } from '../../../redax/profileReduser';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';

const MyPostsContainer = (props) => {
	return <MyPosts {...props} />
}

const mapStateToProps = (state) => {
	return {
		User: state.profilePage.User
	}
}

export default compose(
	connect(mapStateToProps, { addPost, newPostText }),
	withAuthRedirect
)(MyPostsContainer)

// const AuthRedirectComponent = withAuthRedirect(MyPostsContainer)

//  connect(mapStateToProps, { addPost, newPostText })(AuthRedirectComponent);
