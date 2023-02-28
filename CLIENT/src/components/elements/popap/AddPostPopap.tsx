import { useState } from 'react';
import { AddPost } from '../../homePage/myPosts/addPost/AddPost';
import { Button } from '../../styleedComponents/Button';
import { OverLayPopap } from '../UiKit/OverLayPopap';

export const AddPostPopap = () => {
	const [isOpend, setIsOpen] = useState(false);
	const handlePopap = () => setIsOpen(!isOpend);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Add Post</Button>
			<OverLayPopap isOpened={isOpend} onClose={handlePopap}>
				<AddPost onClose={handlePopap} />
			</OverLayPopap>
		</>
	);
};