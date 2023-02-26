import { useLocation, useNavigate } from 'react-router-dom';
import { usePhotosPath } from '../../../hooks/hooks';
import { SVG } from '../../../img/icons/exportIcons';
import style from './photoPage.module.scss';

const PhotoPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const photo = location.pathname.split('/')[2];

	return (
		<div className={style.photo}>
			<SVG.Cancel onClick={() => navigate(-1)} />
			<img src={usePhotosPath(photo)} alt='' />
		</div>
	);
};

export default PhotoPage;
