import {View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FormEntry from '@/components/FormEntry';
import {TouchableOpacity} from 'react-native';
import { router } from 'expo-router';
import SvgIcon from '@/components/SvgIcon';
import {icons} from '@/constants/icons';
import useFetch from '@/services/useFetch';
import {downloadModel} from '@/services/api';

const PullModel = () => {
	const [repo, setRepo] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [quant, setQuant] = useState<string>("");
	const [pressed, setPressed] = useState(false);
	const {
		loading,
		refetch
	} = useFetch(async () => {
		downloadModel(repo, name, quant)
	});

	useEffect(() => {
		if (pressed) {
			const timeoutId = setTimeout(async () => {
				await refetch();
				setPressed(false);
			}, 500)

			return () => clearTimeout(timeoutId);
		}
	}, [pressed])

	const handlePress = () => {
		if (!loading) {
			setPressed(true);
		}
	};

	return (
		<SafeAreaView
			className='flex-1'
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
						className='mt-[20%] flex flex-column h-full'
					>
						<Text
							className='text-primary font-fregular ml-5 text-xl'
						>
							Download a Model
						</Text>
						<View
							className='ml-8 mt-4'
						>
							<FormEntry
								title='Model Repository'
								placeholder='Enter the repo name.'
								value={repo}
								setValue={setRepo}
							/>
							<FormEntry
								className='mt-3'
								title='Model name'
								placeholder='Enter the new name for the model.'
								value={name}
								setValue={setName}
							/>
							<FormEntry
								className='mt-3'
								title='Quantization'
								placeholder='Enter the desired quantization level.'
								value={quant}
								setValue={setQuant}
							/>
						</View>
						<View
							className='absolute flex flex-row justify-between items-center w-full px-4 bottom-[12%]'
						>
							<TouchableOpacity
								className='flex flex-row justify-between items-center border-[1px] border-primary py-5 px-16 rounded-full'
								onPress={router.back}
							>
								<Text className='text-primary font-fregular mr-2'>Cancel</Text>
								<SvgIcon Icon={icons.cancel_button} color={{color: "#212121"}}/>
							</TouchableOpacity>
							<TouchableOpacity
								className='flex flex-row justify-between items-center border-[1px] border-primary py-5 px-12 rounded-full'
								onPress={handlePress}
							>
								<Text className='text-primary font-fregular mr-2'>Download</Text>
								<SvgIcon Icon={icons.download_icon} color={{color: "#212121"}}/>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
export default PullModel
