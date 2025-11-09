import {View, Text, TextInput} from 'react-native';
import React from 'react';

interface FormProps {
	title: string;
	placeholder: string;
	value: string;
	setValue: (text: string) => void;
	className?: string;
};

const FormEntry = ({
	title,
	placeholder,
	value,
	setValue,
	className
}: FormProps) => {
	return (
		<View
			className={className}
		>
			<Text className='text-primary font-fregular text-lg'>{title}</Text>
			<View
				className='flex-row border-[1px] rounded-[10] border-primary justify-start w-[85%] mt-3 ml-3'
			>
				<TextInput
					placeholder={placeholder}
					placeholderTextColor="#666666"
					className='mr-5 pr-6 mt-1 mb-1 ml-2 w-[95%]'
					multiline={true}
					textAlignVertical='bottom'
					selectTextOnFocus={false}
					value={value}
					onChangeText={(text: string) => setValue(text)}
				/>
			</View>
		</View>
	);
}
export default FormEntry
