import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Link} from 'expo-router';

interface ModelPreloadProps {
	name: string;
};

const ModelInfo = ({name}: ModelPreloadProps) => {
	return (
		<Link href={`/preload/${name}`} asChild>
			<TouchableOpacity
				className='ml-8 mt-5'
			>
				<Text className='text-primary font-fregular text-base'>{name}</Text>
			</TouchableOpacity>
		</Link>
	)
}
export default ModelInfo
