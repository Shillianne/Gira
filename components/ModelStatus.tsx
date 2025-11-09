import {View, Text, TouchableWithoutFeedback, Modal} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

interface StatusProps {
	visible: boolean;
	handleOpen: () => void;
	handleClose: () => void;
	trigger: React.ReactNode;
	children: React.ReactNode;
	dropdownWidth?: number;
}

const ModelStatus = ({
	visible,
	handleOpen,
	handleClose,
	trigger,
	children,
	dropdownWidth = 150,
}: StatusProps) => {
	const triggerRef = useRef<View>(null);
	const [position, setPosition] = useState({x: 0, y: 0, width: 0});

	useEffect(() => {
		if (triggerRef.current && visible) {
			triggerRef.current.measure((fx, fy, width, height, px, py) => {
				setPosition({
					x: px,
					y: py + height,
					width: width
				});
			});
		}
	}, [visible])
	return (
		<View
			className='flex w-full items-center'
		>
			<TouchableWithoutFeedback
				className='flex'
				onPress={handleOpen}
			>
				<View ref={triggerRef} className='w-full items-center'>{trigger}</View>
			</TouchableWithoutFeedback>
			{visible && (
				<Modal
					transparent={true}
					visible={visible}
					animationType='fade'
					onRequestClose={handleClose}
				>
					<TouchableWithoutFeedback
						onPress={handleClose}
					>
						<View
							className='flex flex-start align-start bg-transparent'
						>
							<View
								style={{
									top: position.y,
									left: position.x + position.width / 2 - dropdownWidth / 2,
									width: dropdownWidth
								}}
								className='items-start border-[1px] border-primary rounded-[20] mt-3 pb-3'
							>
								{children}
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			)}
		</View>
	)
}
export default ModelStatus
