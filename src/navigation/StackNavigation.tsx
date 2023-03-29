import { useDrawerStatus } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StatusBar, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import Home from '../components/Screens/Home';
import Setting from '../components/Screens/Setting';
import { NoHeader, TitleHeader } from './screenConfigs';

const Stack = createStackNavigator();

const defaultNavigationRoutes = {
	HOME: 'Home',
	SETTING: 'Setting',
} as const;

// use with props navigation
// type Props = StackScreenProps<RootStackParamList, "Home">;
// tham khảo => https://reactnavigation.org/docs/typescript/

export type RootStackParamList = {
	[defaultNavigationRoutes.HOME]: undefined;
	[defaultNavigationRoutes.SETTING]: undefined;
};
export const navigationRoutes = {
	...defaultNavigationRoutes,
} as const;

const StackNavigation = ({ style }: { style: ViewStyle }): React.ReactElement => {
	const drawerStatus = useDrawerStatus();
	useEffect(() => {
		if (drawerStatus === 'open') {
			StatusBar.setBarStyle('dark-content');
		} else {
			StatusBar.setBarStyle('light-content');
		}
	}, [drawerStatus]);
	return (
		<Animated.View style={{ ...style, backgroundColor: '#ccc', flex: 1, overflow: 'hidden' }}>
			<Stack.Navigator
				screenOptions={{
					animationTypeForReplace: 'push',
					gestureEnabled: false,
					headerShown: false,
				}}
				initialRouteName={navigationRoutes.HOME}
			>
				<Stack.Screen name={navigationRoutes.HOME} component={Home} options={NoHeader} />
				<Stack.Screen
					name={navigationRoutes.SETTING}
					component={Setting}
					options={TitleHeader('Training')}
				/>
			</Stack.Navigator>
		</Animated.View>
	);
};

export default StackNavigation;
