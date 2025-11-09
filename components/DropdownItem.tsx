import {View, Text} from 'react-native';
import React from 'react';

interface ItemProps {
	name: string
}

const DropdownItem = ({name}: ItemProps) => {
	return (
		<View
			className='mt-4 ml-4'
		>
			<Text className='font-fregular text-primary'>{name}</Text>
		</View>
	)
}
export default DropdownItem
