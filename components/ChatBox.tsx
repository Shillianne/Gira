import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ChatMessage from './ChatMessage';
import {useConversationContext} from './ConversationContext';
import useFetch from '@/services/useFetch';
import {fetchConversation} from '@/services/api';
import { AsyncQueue } from "@ai-zen/async-queue";
import ConversationTitle from './ConversationTitle';

interface Message {
	completed: boolean;
	role: string;
	content: string;
};

const ChatBox = () => {
	const { id, messageTaskId, setMessageTaskId } = useConversationContext();
	const [messages, setMessages] = useState<Message[]>([]);
	const [websocket, setWebsocket] = useState<WebSocket | null>(null);
	const [finished, setFinished] = useState(false);
	const [firstResponse, setFirstResponse] = useState(false);
	const messageQueue = new AsyncQueue<string>();
	const flatListRef = useRef<FlatList>(null);

	const {
		data,
		refetch,
		reset
	} = useFetch(() => fetchConversation(id));

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			await refetch();
		}, 200);

		return () => clearTimeout(timeoutId);
	}, [id]);

	useEffect(() => {
		setMessages(data);
		console.log("Data:")
		console.log(data)
	}, [data]);

	useEffect(() => {
		if (messages && messages.length > 0) {
			flatListRef.current?.scrollToEnd({ animated: true });
		}
	}, [messages]);
	
	useEffect(() => {
		if (!messageTaskId) {
			return;
		}
		const timeoutId = setTimeout(async () => {
			await refetch();
		})
		const ws = new WebSocket(`http://${process.env.EXPO_PUBLIC_BASE_URL}/chat/response/${id}`);
		setWebsocket(ws);
		ws.onmessage = (e) => {
			console.log("Received a message from server.")
			const event = JSON.parse(e.data);
			console.log(`Event type: ${event.type}`)
			switch (event.type) {
				case "delta":
					console.log(`Content: ${event.content}`);
					(async () => {
						await messageQueue.backpressure(64)
						console.log("Adding to messageQueue");
						messageQueue.push(event.content);
					})();
					break;
				case "finish":
					setMessageTaskId(null);
					setFinished(true);
					setFirstResponse(true);
					break;
				case "error":
					console.log("Received an error from server:");
					console.log(event);
					break;
				case "default":
					break;
			}
		}

		return () => clearTimeout(timeoutId);
	}, [messageTaskId]);

	useEffect(() => {
		if (messageTaskId) {
			console.log(`Queue size: ${messageQueue.size}`)
			const updateMessages = (
				delta: Message
			) => {
				setMessages(prev => 
					[ ...prev.filter(m => m.completed), delta ]
				);
			};
			const watchQueue = async () => {
				let delta: Message | null = null;
				for await (const value of messageQueue) {
					console.log(`Value: ${value}`);
					delta = delta 
						? { ...delta, content: delta.content + value }
						: { completed: false, role: "assistant", content: value };
					console.log(`Delta: ${delta}`);
					updateMessages(delta);
				}
			};

			watchQueue();
		}
	}, [messageTaskId]);

	useEffect(() => {
		if (finished) {
			const timeoutId = setTimeout(async () => {
				await refetch();
			});
			setFinished(false);
			// setCurrentResponse(null);

			return () => clearTimeout(timeoutId);
		}
	}, [finished]);

	return (
		<View
			className='flex-1 flex-col justify-center w-[85%]'
		>
			<ConversationTitle
				firstResponse={firstResponse}
			/>
			<FlatList
				data={messages}
				renderItem={({ item }) => (
					<ChatMessage
						{...item}
					/>
				)}
				keyExtractor={( item, index ) => index.toString()}
				className="w-full flex-1 mb-5 mt-2"
				numColumns={1}
				scrollEnabled={messages ? true : false}
				nestedScrollEnabled={true}
				removeClippedSubviews={true}
				ListEmptyComponent={(
					<View
						className="flex flex-col justify-center items-center mt-20"
					>
						{id ? (
							<Text className='font-fregular text-primary text-xl'>Start a conversation by writing a message</Text>
						) : (
							<Text className="font-fregular text-primary text-xl">No conversation loaded</Text>
						)}
					</View>
				)}
				extraData={id}
			/>
		</View>
	)
}
export default ChatBox
