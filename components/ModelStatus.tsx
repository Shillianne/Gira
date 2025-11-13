import {View, Text} from 'react-native';
import React from 'react';

const ModelStatus = () => {
	return (
		<View
			className="flex flex-row justify-center align-center border-[1px] border-red-500"
		>
			<View
				className="flex justify-center align-center py-2 px-[20%] border-[1px] border-primary rounded-[20px]"
			>
				<Text className="text-primary font-fregular">Model Name</Text>
			</View>
		</View>
	)
}
export default ModelStatus
