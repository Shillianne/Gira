import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import { SvgProps } from 'react-native-svg';

interface SvgIconProps {
	Icon: React.FC<SvgProps>;
	style: any;
}

const SvgIcon = ({ Icon, style }: SvgIconProps) => {
	return (
		<View>
			<Icon style={style} />
		</View>
	)
}
export default SvgIcon
