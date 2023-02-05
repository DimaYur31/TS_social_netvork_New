import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


// принимает индекс, под которым находится id в массиве из адресной строки, и колбэк который делает запрос нужных данных
export const useGetPageData = (index: number, cb: (id: string) => any) => {
	const location = useLocation();
	const [data, setData] = useState();

	const path = location.pathname.split('/');
	const renderId = path[index];

	const getData = async () => {
		const response = await cb(renderId);
		response && setData(response);
	};

	useEffect(() => {
		getData();
	}, [renderId]);

	const reload = () => getData();

	return { data, renderId, reload };
};