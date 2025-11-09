import {View, Text} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';
import {ImageBackground} from 'react-native';
import {images} from '@/constants/images';

interface IconProps {
	focused: boolean;
	text: string;
};

const TabIcon = ({focused, text}: IconProps) => {
	if (focused) {
		return (
			<ImageBackground
				source={images.slider_bg}
				className='flex flex-1 flex-row w-full min-w-[120px] min-h-12 justify-center items-center rounded-full overflow-hidden'
			>
				<Text className='text-primary font-fregular text-sm'>{text}</Text>
			</ImageBackground>
		);
	}
	return (
		<View className='flex flex-1 flex-row min-w-[120px] min-h-12 justify-center items-center'>
			<Text className='text-primary text-sm font-fregular'>{text}</Text>
		</View>
	);
}

const _Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: 'center',
					alignItems: 'center',
				},
				tabBarStyle: {
					backgroundColor: "transparent",
					borderWidth: 1,
					borderColor: "primary",
					position: "absolute",
					marginBottom: "89%",
					marginHorizontal: "18%",
					height: 44,
					paddingTop: 5,
					borderRadius: 30,
					borderTopWidth: 1
				}
			}}
		>
			<Tabs.Screen
				name="modelList"
				options={{
					headerShown: false,
					title: "Model List",
					tabBarIcon: ({focused}) => (
						<TabIcon focused={focused} text='Model List' />
					)
				}}
			/>
			<Tabs.Screen
				name="pullModel"
				options={{
					headerShown: false,
					title: "Pull a model",
					tabBarIcon: ({focused}) => (
						<TabIcon focused={focused} text='Pull Model' />
					)
				}}
			/>
		</Tabs>
	)
}
export default _Layout
