import { Text, ViewStyle } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';

const Setting = ({ style }: { style: ViewStyle }) => {
	return (
		<Animated.View
			style={{
				...style,
				backgroundColor: '#ccc',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>setting</Text>
		</Animated.View>
	);
};

export default Setting;
