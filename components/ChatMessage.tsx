import { View, Text } from 'react-native';
import React from 'react';

interface MessageProps {
	role: string;
	content: string;
}

const ChatMessage = ({
	role,
	content
}: MessageProps) => {
	return (
		<View
			className={`flex flex-row mx-2 pt-2 ${role == "assistant" ? "justify-start" : "justify-end"}`}
		>
			<View
				className={`rounded-[20] py-2 px-3 shadow ${role == "assistant" ? "bg-ai w-[225px]" : "bg-user w-[200px]"}`}
			>
				<Text
					className='text-primary font-fregular'
				>
					{content}
				</Text>
			</View>
		</View>
	);
};
// NOTE: Change to code being 1 View and inside it 1 TextInput, instead of the current arangement. I believe if I do that te TextInput shuold be able to change the size of the View
export default ChatMessage
