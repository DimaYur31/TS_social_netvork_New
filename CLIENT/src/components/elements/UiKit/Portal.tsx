import { useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
	children: ReactNode
}

export const Portal = ({ children }: PortalProps) => {
	const [container] = useState(() => document.createElement('div'));

	useEffect(() => {
		document.body.appendChild(container);

		return () => {
			document.body.removeChild(container);
		};
	}, []);

	return ReactDOM.createPortal(children, container);
};