import {View, Text, TouchableHighlight } from 'react-native';
import React, {useState} from 'react';
import SvgIcon from './SvgIcon';

interface SideElementProps {
	title: string;
	icon: any;
	textClassName: string;
	viewClassName: string;
	newChat?: boolean;
	onPressText?: () => void;
	onPressIcon?: () => void;
}

const SideElement = ({ title, icon, textClassName, viewClassName, newChat, onPressText, onPressIcon }: SideElementProps) => {
	const [color, setColor] = useState("bg-light-300")
	const [pressed, setPressed] = useState(false);

	return (
		<View
			className={`flex-row justify-between items-center ${viewClassName} rounded-full ml-[-8] ${color}`}
		>
			<TouchableHighlight
				className='w-[80%] flex flex-row justify-start'
				onShowUnderlay={() => setColor("bg-light-200")}
				onHideUnderlay={() => setColor("bg-light-300")}
				underlayColor="transparent"
				activeOpacity={1}
				onPress={onPressText}
			>
				<Text
					className={textClassName}
					numberOfLines={1}
				>
					{title}
				</Text>
			</TouchableHighlight>
			<TouchableHighlight
				className='py-1 px-1'
				onShowUnderlay={() => {
					if (!newChat) {
						setPressed(true);
					} else {
						setColor("bg-light-200");
					}
				}}
				onHideUnderlay={() => {
					if (!newChat) {
						setPressed(false);
					} else {
						setColor("bg-light-300");
					}
				}}
				underlayColor="transparent"
				activeOpacity={1}
				onPress={onPressIcon}
			>
				<SvgIcon Icon={icon} style={{ color: pressed ? "#db3535" : "#212121" }} />
			</TouchableHighlight>
		</View>
	)
}
export default SideElement
