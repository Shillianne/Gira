import MessageInput from "@/components/MessageInput";
import SvgIcon from "@/components/SvgIcon";
import {icons} from "@/constants/icons";
import {Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { View } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { useSharedValue, withTiming, ReduceMotion, Easing, runOnJS } from "react-native-reanimated";
import {useFloatingOverlay} from "@/components/FloatingOverlayContext";
import {useEffect, useState} from "react";
import {Platform} from "react-native";
import { Link } from "expo-router";
import ChatBox from "@/components/ChatBox";
import SidePanel from "@/components/SidePanel";

export default function Index() {
  const { setOverlay } = useFloatingOverlay();
  const position = useSharedValue<number>(-273);
  const opacity = useSharedValue<number>(0.0);
  const [extending, setExtending] = useState(false);

  useEffect(() => {
	  setOverlay(<SidePanel
					position={position}
					opacity={opacity}
					extend={extending}
				 />);

	  return () => setOverlay(null);
  }, [extending]);

  const extendSidePanel = () => {
	  console.log("Extending")
	  setExtending(true);
	  position.value = withTiming(0, {
		  duration: 800,
		  easing: Easing.bezier(0.5, 0.1, 0.5, 0.9),
		  reduceMotion: ReduceMotion.System
	  }, () => {runOnJS(setExtending)(false)});
	  opacity.value = withTiming(0.60, {
		  duration: 800,
		  easing: Easing.bezier(0.5, 0.1, 0.5, 0.9),
		  reduceMotion: ReduceMotion.System
	  });
  }

  return (
	  <SafeAreaView
		className="flex-1"
	  >
		<KeyboardAvoidingView
			className="flex-1 mb-16"
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View
				className="flex flex-row justify-between mx-8 mt-3"
			>
				<TouchableOpacity
					className="px-1 py-1"
					onPress={extendSidePanel}
				>
					<SvgIcon Icon={icons.side_right} style={{ color: "#212121" }}/>
				</TouchableOpacity>
				<Link href="/settings/modelList" asChild>
					<TouchableOpacity>
						<SvgIcon Icon={icons.burger} style={{ color: "#212121" }}/>
					</TouchableOpacity>
				</Link>
			</View>
			{/*
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View
					className="flex-1 flex-col justify-end items-center mb-4"
				>
					<ChatBox />
					<MessageInput />
				</View>
			</TouchableWithoutFeedback>
			*/}
			<View
				className="flex-1 flex-col justify-end items-center mb-4"
			>
				<ChatBox />
				<MessageInput />
			</View>
		</KeyboardAvoidingView>
	</SafeAreaView>
  );
}
