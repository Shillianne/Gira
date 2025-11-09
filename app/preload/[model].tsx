import {View, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Switch from '@/components/Switch';
import {useSharedValue} from 'react-native-reanimated';
import SvgIcon from '@/components/SvgIcon';
import {icons} from '@/constants/icons';
import {router, useLocalSearchParams} from 'expo-router';
import {loadModel} from '@/services/api';

const Preload = () => {
	const { model } = useLocalSearchParams();
	const [ctx, setCtx] = useState("16");
	const faEnabled = useSharedValue(false);

	const handlePress = () => {
		faEnabled.value = !faEnabled.value;
	}
	
	useEffect(() => {
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			Keyboard.dismiss();
		});
		return () => {
			hideSubscription.remove();
		};
	}, []);

	const load = async () => {
		await loadModel(model as string, Number(ctx), faEnabled.get());
		router.dismissAll();
	};
	return (
		<SafeAreaView
			className='flex h-full'
		>
			<KeyboardAvoidingView
				className="flex-1"
				behavior={"height"}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
					accessible={false}
				>
					<View
						className='flex-1'
					>
						<View
							className='flex justify-center items-center mt-4'
						>
							<Text className='text-primary font-fregular text-2xl'>Preload Settings</Text>
						</View>
						<View
							className='flex flex-row justify-between mx-5 mt-6'
						>
							<Text className='text-primary font-fregular text-xl'>Context Size</Text>
							<View
								className='flex border-[1px] rounded-[10] w-[20%] px-2'
							>
								<TextInput
									className='mr-5 mb-1 mt-1 w-full'
									textAlignVertical='bottom'
									inputMode='numeric'
									textAlign='right'
									selectTextOnFocus={false}
									value={ctx}
									onChangeText={(text: string) => setCtx(text)}
								/>
							</View>
						</View>
						<View
							className='flex flex-row justify-between mx-5 mt-6'
						>
							<Text className='text-primary font-fregular text-xl'>Flash Attention</Text>
							<Switch
								value={faEnabled}
								onPress={handlePress}
								thumbColor='#212121'
								trackColors={{on: "#b3b3b3", off: "#ffffff"}}
								switchOptions={{
									alignItems: "flex-start",
									height: 30,
									width: 75,
									padding: 5
								}}
								className='border-[1px] border-primary'
							/>
						</View>
						<View
							className='absolute flex flex-row justify-between items-center bottom-[2%] w-full px-4'
						>
							<TouchableOpacity
								className='flex flex-row justify-between items-center border-[1px] border-primary py-5 px-16 rounded-full'
								onPress={router.back}
							>
								<Text className='text-primary font-fregular mr-2'>Cancel</Text>
								<SvgIcon Icon={icons.cancel_button} color={{color: "#212121"}}/>
							</TouchableOpacity>
							<TouchableOpacity
								className='flex flex-row justify-between items-center border-[1px] border-primary py-5 px-16 rounded-full'
								onPress={load}
							>
								<Text className='text-primary font-fregular mr-2'>Load</Text>
								<SvgIcon Icon={icons.upload} color={{color: "#212121"}}/>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
export default Preload
