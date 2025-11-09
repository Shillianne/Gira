declare module "*.png" {
	const value: any;
	export default value;
}

declare module "*.jpg" {
	const value: any;
	export default value;
}

declare module "*.jpeg" {
	const value: any;
	export default value;
}

declare module "*.gif" {
	const value: any;
	export default value;
}

declare module "*.svg" {
	import React from "react";
	import { SvgProps } from "react-native-svg";
	import { ViewStyle, StyleProp } from "react-native";
	interface SvgStyle extends StyleProp<ViewStyle> {
		color?: string;
	}
	interface SvgViewProps extends SvgProps {
		style: SvgStyle;
	}
	const content: React.FC<SvgViewProps>;
	export default content;
}
