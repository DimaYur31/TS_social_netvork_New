import { createContext, Dispatch, FC, ReactElement, SetStateAction, useState, } from "react"

export type EditContextType = {
	editState: {
		isEdit: boolean
		text: string
		messageId: string
	}
	setEditState: Dispatch<SetStateAction<{ isEdit: boolean; text: string; messageId: string; }>>

}

type typeProps = {
	children: ReactElement
}

export const EditContext = createContext({} as EditContextType)

export const EditMessageContext: FC<typeProps> = ({ children }) => {
	const [editState, setEditState] = useState({
		isEdit: false,
		text: '',
		messageId: ''
	})

	return (
		<EditContext.Provider value={{
			editState,
			setEditState
		}}>
			{children}
		</EditContext.Provider>
	)
}

