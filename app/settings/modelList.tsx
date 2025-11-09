import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useId} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useFetch from '@/services/useFetch';
import {fetchModels} from '@/services/api';
import ModelInfo from '@/components/ModelInfo';
import {Link} from 'expo-router';

const ModelList = () => {
	const {
		data,
		loading,
		error,
		refetch,
		reset
	} = useFetch(fetchModels);

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			await refetch();
			console.log(data);
		})

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<SafeAreaView>
			<View
				className='mt-[20%] flex'
			>
				<Text
					className='text-primary font-fregular text-xl ml-5'
				>
					Available Models
				</Text>
				<FlatList
					data={data}
					renderItem={({item}) => (
						<ModelInfo
							name={item.name}
						/>
					)}
					keyExtractor={( item ) => item.id.toString()}
					className='border-red-500 border-[1px] h-[95%]'
					numColumns={1}
					scrollEnabled={data && data.length > 0 ? true : false}
					ListEmptyComponent={(
						<View
							className='flex mt-[30%] justify-center items-center'
						>
							<Text className='text-primary font-fregular text-xl'>There are no models currently saved.</Text>
							<Link href="/settings/pullModel" asChild>
								<Text className='mt-3 text-primary font-fbold underline'>Download a new model</Text>
							</Link>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	)
}
export default ModelList
