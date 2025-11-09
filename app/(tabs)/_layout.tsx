import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';
import {icons} from '@/constants/icons';
import SvgIcon from '@/components/SvgIcon';
import { FloatingOverlayProvider, useFloatingOverlay } from '@/components/FloatingOverlayContext';
import { ConversationContextProvider } from '@/components/ConversationContext';

interface IconProps {
	focused: boolean;
	Icon: any;
}

function TabIcon({ focused, Icon }: IconProps) {
	if (focused) {
		return (
			<View>
				<SvgIcon Icon={Icon} style={{ color: "#212121" }}/>
			</View>
		);
	}

	return (
		<View>
			<SvgIcon Icon={Icon} style={{ color: "#a7a7a7" }}/>
		</View>
	);
}

function FloatingOverlay() {
	const { overlay } = useFloatingOverlay();

	if (!overlay) return null;

	return (
		<View
			className='flex flex-1 h-full w-full absolute'
		>
			{overlay}
		</View>
	);
}

const _Layout = () => {
	return (
		<FloatingOverlayProvider>
			<ConversationContextProvider>
				<View
					className='flex-1'
				>
					<Tabs
						screenOptions={{
							tabBarShowLabel: false,
							tabBarItemStyle: {
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
								marginTop: 17
							},
							tabBarStyle: {
								backgroundColor: "transparent",
								borderRadius: 50,
								marginHorizontal: 20,
								marginBottom: 36,
								height: 55,
								borderColor: "transparent",
								position: "absolute",
								overflow: "hidden",
							}
						}}
					>
						<Tabs.Screen
							name="index"
							options={{
								headerShown: false,
								title: "Chat",
								tabBarIcon: ({ focused }) => (
									<TabIcon focused={focused} Icon={icons.chat} />
								),
							}}
						/>
						<Tabs.Screen
							name="audio"
							options={{
								headerShown: false,
								title: "Audio",
								tabBarIcon: ({ focused }) => (
									<TabIcon focused={focused} Icon={icons.audio} />
								),
							}}
						/>
					</Tabs>
					<FloatingOverlay />
				</View>
			</ConversationContextProvider>
		</FloatingOverlayProvider>
	)
}
export default _Layout
