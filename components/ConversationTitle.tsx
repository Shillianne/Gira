import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useConversationContext} from './ConversationContext';
import {AsyncQueue} from '@ai-zen/async-queue';
import {changeTitle} from '@/services/api';

interface TitleProps {
	firstResponse: boolean;
};

const ConversationTitle = ({
	firstResponse
}: TitleProps) => {
	const { id, title, setTitle, titleTaskId, setTitleTaskId } = useConversationContext();
	const [websocket, setWebsocket] = useState<WebSocket | null>(null)
	const titleQueue = new AsyncQueue<string>();

	useEffect(() => {
		if (websocket) {
			websocket.close(1000);
		}
		if (titleTaskId) {
			const ws = new WebSocket(`ws://${process.env.EXPO_PUBLIC_BASE_URL}/conversation/${id}/title`);
			setWebsocket(websocket);
			ws.onmessage = (e) => {
				console.log("[Title] Received a message from server.")
				const event = JSON.parse(e.data);
				console.log(`Event type: ${event.type}`)
				switch (event.type) {
					case "delta":
						console.log(`[Title] Content: ${event.content}`);
						(async () => {
							await titleQueue.backpressure(64)
							console.log("Adding to titleQueue");
							titleQueue.push(event.content);
						})();
						break;
					case "finish":
						break;
					case "error":
						console.log("[Title] Received an error from server:");
						console.log(event);
						break;
					case "default":
						break;
				}
			}
		}
	}, [titleTaskId]);

	useEffect(() => {
		if (titleTaskId) {
			console.log(`[Title] Queue size: ${titleQueue.size}`)
			const updateMessages = (
				delta: string
			) => {
				setTitle(delta);
			};
			const watchQueue = async () => {
				let delta: string | null = null;
				for await (const value of titleQueue) {
					console.log(`[Title] Value: ${value}`);
					delta = delta ? delta + value : value;
					console.log(`[Title] Delta: ${delta}`);
					updateMessages(delta);
				}
			};

			watchQueue();
		}
	}, [titleTaskId]);

	useEffect(() => {
		if (firstResponse) {
			const timeoutId = setTimeout(async () => {
				setTitleTaskId(await changeTitle(id));
			});

			return () => clearTimeout(timeoutId);
		}
	}, [firstResponse])

	return (
		title ? (
			<View
				className='flex flex-row justify-center align-center mb-2'
			>
				<Text className='text-primary font-fregular text-xl'>{title}</Text>
			</View>
		) : (
			<View></View>
		)
	)
}
export default ConversationTitle
