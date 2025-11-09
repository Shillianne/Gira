import React, {createContext, useContext, useState, ReactNode} from "react";

interface ContextType {
	overlay: ReactNode | null;
	setOverlay: (node: ReactNode | null) => void;
}

const FloatingOverlayContext = createContext<ContextType>({
	overlay: null,
	setOverlay: () => {},
});


export const useFloatingOverlay = () => useContext(FloatingOverlayContext);

export const FloatingOverlayProvider = ({ children }: { children: ReactNode }) => {
	const [overlay, setOverlay] = useState<ReactNode | null>(null);

	return (
		<FloatingOverlayContext.Provider value={{ overlay, setOverlay }}>
			{children}
		</FloatingOverlayContext.Provider>
	);
}
