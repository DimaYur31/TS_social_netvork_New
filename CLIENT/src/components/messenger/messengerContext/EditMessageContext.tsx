import {
	createContext, Dispatch,
	ReactElement, SetStateAction, useState,
} from 'react';

export type EditContextType = {
	editState: {
		isEdit: boolean
		text: string
		messageId: string
	}
	setEditState: Dispatch<SetStateAction<{ isEdit: boolean; text: string; messageId: string; }>>
}

export const EditContext = createContext({} as EditContextType);

export const EditMessageContext = ({ children }: { children: ReactElement }) => {

	const [editState, setEditState] = useState({
		isEdit: false,
		text: '',
		messageId: ''
	});

	return (
		<EditContext.Provider value={{
			editState,
			setEditState
		}}>
			{children}
		</EditContext.Provider>
	);
};