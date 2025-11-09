import {View, Text, TouchableWithoutFeedback, TouchableOpacity, Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, { SharedValue, withTiming, ReduceMotion, Easing, runOnJS, useAnimatedStyle } from "react-native-reanimated";
import useFetch from '@/services/useFetch';
import {createConversation, deleteConversation, fetchTitles} from '@/services/api';
import {useConversationContext} from './ConversationContext';
import SvgIcon from './SvgIcon';
import {icons} from '@/constants/icons';
import SideElement from './sideElement';

interface SidePanelProps {
	position: SharedValue<number>;
	opacity: SharedValue<number>;
	extend: boolean;
}

const SidePanel = ({ position, opacity, extend }: SidePanelProps ) => {
  const {
	  data,
	  loading,
	  error,
	  refetch,
	  reset
  } = useFetch(() => fetchTitles());
  
  const { setId, setTitle } = useConversationContext();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
	  const timeoutId = setTimeout(async () => {
		  if (extend || deleted) {
			  console.log("Fetching...")
			  await refetch();
			  if (deleted) setDeleted(false);
		  }
		}, 500)

		return () => clearTimeout(timeoutId)
  }, [extend, deleted])

  const positionAnimation = useAnimatedStyle(() => ({
	  transform: [{ translateX: position.value }],
  }));
  const opacityAnimation = useAnimatedStyle(() => ({
	  opacity: opacity.get()
  }));

  const retractSidePanel = () => {
	  console.log("Retracting")
	  position.value = withTiming(-273, {
		  duration: 800,
		  easing: Easing.bezier(0.5, 0.1, 0.5, 0.9),
		  reduceMotion: ReduceMotion.System,
	  }, () => {runOnJS(reset)()})
	  opacity.value = withTiming(0.0, {
		  duration: 800,
		  easing: Easing.bezier(0.5, 0.1, 0.5, 0.9),
		  reduceMotion: ReduceMotion.System
	  })
  }


  return (
	<>
		<TouchableWithoutFeedback
			className="flex-1"
			onPress={retractSidePanel}
		>
			<Animated.View
				className="flex-1 bg-side opacity-[.60]"
				style={opacityAnimation}
			>
			</Animated.View>
		</TouchableWithoutFeedback>
		<Animated.View
			className={`flex-1 flex-col rounded-tr-[34] rounded-br-[34] bg-light-300 absolute w-[66%] h-[95%] bottom-0 left-0 border-[1px] border-primary`}
			style={positionAnimation}
		>
			<View
				className="mt-5 mr-6 flex flex-row justify-end"
			>
				<TouchableOpacity
					className="px-1 py-1"
					onPress={retractSidePanel}
				>
					<SvgIcon Icon={icons.side_left} style={{ color: "#212121" }}/>
				</TouchableOpacity>
			</View>
			<View
				className="flex-1 flex-col mt-10 ml-5"
			>
				<SideElement
					title="New Chat"
					icon={icons.new_chat}
					textClassName="font-fregular text-primary text-xl"
					viewClassName="mr-3 px-4 py-3"
					newChat
					onPressText={ async () => {
						try {
							const data = await createConversation();
							setTitle(data.title);
							setId(data.id);
							retractSidePanel();
						} catch (error) {
							Alert.alert("Unexpected Error", "Failed to create a conversation");
						}
					}}
					onPressIcon={ async () => {
						try {
							const data = await createConversation();
							setTitle(data.title);
							setId(data.id);
							retractSidePanel();
						} catch (error) {
							Alert.alert("Unexpected Error", "Failed to create a conversation");
						}
					}}
				/>
				<Text className="font-fregular text-xl text-primary mt-5 pl-2">Previous Chats</Text>
				<View
					className="flex-1 mb-[30%]"
				>
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<SideElement
								title={item.title}
								icon={icons.trash}
								textClassName="font-fregular text-primary text-sm"
								viewClassName="mr-2 px-4 py-2 my-2 ml-1"
								onPressText={() => {
									console.log(`Title: ${item.title}`)
									setTitle(item.title);
									setId(item.id);
									retractSidePanel();
								}}
								onPressIcon={ async () => {
									try {
										const result = await deleteConversation(item.id);
										if (result) {
											setId(null);
											setDeleted(true);
										} else {
											Alert.alert("Unexpected Error", "Failed to delete conversation");
										}
									} catch (error) {
										Alert.alert("Unexpected Error", "Failed to delete conversation");
									}
								}}
							/>
						)}
						className="mt-6 rounded-br-[34]"
						keyExtractor={(item) => item.id.toString()}
						numColumns={1}
					/>
				</View>
			</View>
		</Animated.View>
	</>
	);
}

export default SidePanel
