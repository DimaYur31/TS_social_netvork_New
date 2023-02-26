import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../../../hooks/reactReduxHooks';
import { selectDefaultUserAvatar, selectDefaultUserId, selectDefaultUserName } from '../../../../selectors/selectors';
import { usePhotosPath } from '../../../../hooks/hooks';
import { Clear } from '../../../styleedComponents/Search';
import { createComment } from '../../../../api/postAPI';
import { PrimaryInput } from '../primaryInput/PrimaryInpyt';
import { PrimaryButton } from '../../btn/primaryButton/PrimaryButton';
import { SmalAvatar } from '../../../styleedComponents/SmalAvatar';
import style from './inputPanel.module.scss';

type InputPanelProps = {
	postId: string
	reload: () => void
}

export const InputPanel = ({ postId, reload }: InputPanelProps) => {
	const avatar = useAppSelector(selectDefaultUserAvatar);
	const commentatorId = useAppSelector(selectDefaultUserId);
	const name = useAppSelector(selectDefaultUserName);

	const [intutText, setInputText] = useState('');

	const addComment = async () => {
		if (intutText.trim() === '') {
			setInputText('');
			return;
		}

		const post = await createComment(postId, commentatorId, intutText);

		post && reload();
		post && setInputText('');
	};

	return (
		<div className={style.panel} >
			<div className={style.user} >
				<SmalAvatar src={usePhotosPath(avatar)} />
				<span>{name}</span>
			</div>
			<div className={style.input} >
				<PrimaryInput
					placeholder='Enter your comment'
					value={intutText}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
				/>
				<Clear onClick={() => setInputText('')} />
			</div>
			<PrimaryButton
				onClick={() => addComment()}
			>Add Comment</PrimaryButton>
		</div>
	);
};