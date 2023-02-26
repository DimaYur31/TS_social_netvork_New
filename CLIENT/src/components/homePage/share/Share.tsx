import { usePhotosPath } from '../../../hooks/hooks';
import { SmalAvatar } from '../../styleedComponents/SmalAvatar';
import { Search } from '../../styleedComponents/Search';
import style from './Share.module.scss';

export const Share = () => {
	const avatar = usePhotosPath();

	return (
		<div className={style.share}>
			<SmalAvatar src={avatar} />
			<Search />
		</div>
	);
};