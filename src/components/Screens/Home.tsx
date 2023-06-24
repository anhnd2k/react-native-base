import { Text, ViewStyle, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { useThemeContext } from 'src/Themes';

const Home = ({ style }: { style: ViewStyle }) => {
	const theme = useTheme();
	const setThemeMode = useThemeContext();
	return (
		<Animated.View
			style={{
				...style,
				backgroundColor: theme.colors.background,
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<TouchableOpacity
				onPress={() => setThemeMode.setMode(setThemeMode.mode === 'light' ? 'dark' : 'light')}
			>
				<Text>sadfdsafdsaHome</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

export default Home;
