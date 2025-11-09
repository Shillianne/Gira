import { createContext, useContext, ReactNode, useState } from "react";

interface ConversationContextType {
	id: number | null;
	messageTaskId: string | null;
	title: string | null;
	titleTaskId: string | null;
	setId: (id: number | null) => void;
	setMessageTaskId: (taskId: string | null) => void;
	setTitle: (title: string | null) => void;
	setTitleTaskId: (taskId: string | null) => void;
}

const ConversationContext = createContext<ConversationContextType>({
	id: null,
	messageTaskId: null,
	title: null,
	titleTaskId: null,
	setId: () => {},
	setMessageTaskId: () => {},
	setTitle: () => {},
	setTitleTaskId: () => {},
});


export const useConversationContext = () => useContext(ConversationContext);

export const ConversationContextProvider = ({ children }: { children: ReactNode }) => {
	const [id, setId] = useState<number | null>(null);
	const [messageTaskId, setMessageTaskId] = useState<string | null>(null);
	const [title, setTitle] = useState<string | null>(null);
	const [titleTaskId, setTitleTaskId] = useState<string | null>(null);

	return (
		<ConversationContext.Provider
			value={{
				id,
				messageTaskId,
				setId,
				setMessageTaskId,
				title,
				setTitle,
				titleTaskId,
				setTitleTaskId
			}}
		>
			{children}
		</ConversationContext.Provider>
	);
}
