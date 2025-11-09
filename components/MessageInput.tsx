import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SvgIcon from './SvgIcon';
import {icons} from '@/constants/icons';
import {useConversationContext} from './ConversationContext';
import {sendMessage} from '@/services/api';
import { Keyboard } from 'react-native';

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { setMessageTaskId } = useConversationContext();

	const handlePress = async () => {
		if (message) {
			const taskId = await sendMessage(message);
			setMessageTaskId(taskId);
			setMessage("");
			Keyboard.dismiss();
		}
	};

	return (
		<View
			className='flex flex-row justify-between items-end rounded-[20] border-[1px] border-primary w-[90%] py-2 px-3'
		>
			<TextInput
				placeholder='Send a message...'
				placeholderTextColor="#212121"
				className='mr-5 mb-1 w-[80%] pr-[20px]'
				multiline={true}
				textAlignVertical='bottom'
				selectTextOnFocus={false}
				numberOfLines={5}
				value={message}
				onChangeText={(text: string) => setMessage(text)}
			/>
			<View
				className='absolute bottom-[7.5px] right-2'
			>
				<TouchableOpacity
					onPress={handlePress}
				>
					<SvgIcon
						Icon={icons.send}
						style={{ color: "#212121" }}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}
export default MessageInput
