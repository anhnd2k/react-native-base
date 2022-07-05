import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import Home from '../components/Screens/Home';
import Setting from '../components/Screens/Setting';
import { ViewStyle } from 'react-native';

const Stack = createStackNavigator();

const StackNavigation = ({ style }: { style: ViewStyle }) => {
	return (
		<Animated.View style={{ ...style, backgroundColor: '#ccc', flex: 1, overflow: 'hidden' }}>
			<Stack.Navigator
				screenOptions={{
					animationTypeForReplace: 'push',
					gestureEnabled: false,
					headerShown: false,
				}}
				initialRouteName="Home"
			>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Setting" component={Setting} />
			</Stack.Navigator>
		</Animated.View>
	);
};

export default StackNavigation;
