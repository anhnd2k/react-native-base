import React, { useState } from 'react';
import { StyleSheet, ViewStyle, View, Text } from 'react-native';
import {
	createDrawerNavigator,
	useDrawerProgress,
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import StackNavigation from './StackNavigation';

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
	const [active, setActive] = useState('Home');
	return (
		<DrawerContentScrollView
			styles={{ backgroundColor: 'red', flex: 1 }}
			showsVerticalScrollIndicator={false}
			{...props}
		>
			<View style={{ paddingHorizontal: 20 }}>
				<DrawerItem
					onPress={() => {
						// eslint-disable-next-line react/prop-types
						props.navigation.navigate('Home');
						setActive('Home');
					}}
					activeTintColor="#fff"
					focused={active === 'Home'}
					label={({ focused }) => {
						return <Text style={{ color: focused ? '#fff' : '#000' }}>Home</Text>;
					}}
				/>
				<DrawerItem
					onPress={() => {
						// eslint-disable-next-line react/prop-types
						props.navigation.navigate('Setting');
						setActive('Setting');
					}}
					activeTintColor="#fff"
					focused={active === 'Setting'}
					label={({ focused }) => {
						return <Text style={{ color: focused ? '#fff' : '#000' }}>Setting</Text>;
					}}
				/>
			</View>
		</DrawerContentScrollView>
	);
};

const DrawerNavigation = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				// swipeEnabled: currentRouteName !== navigationRoutes.LOGIN,
				drawerActiveBackgroundColor: 'transparent',
				drawerActiveTintColor: 'red',
				drawerInactiveTintColor: 'white',
				drawerType: 'slide',
				overlayColor: 'transparent',
				drawerStyle: styles.drawerStyles,
				sceneContainerStyle: styles.bgTransparent,
			}}
			useLegacyImplementation
			initialRouteName="Stack"
			drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
		>
			<Drawer.Screen name="Stack">
				{(props) => {
					// eslint-disable-next-line react-hooks/rules-of-hooks
					const progress = useDrawerProgress();
					const scale = Animated.interpolateNode(progress as Animated.Value<number>, {
						inputRange: [0, 1],
						outputRange: [1, 0.7],
					});
					const rotate = Animated.interpolateNode(progress as Animated.Value<number>, {
						inputRange: [0, 1],
						outputRange: ['0deg', '-10deg'],
					});
					const borderRadiusTop = Animated.interpolateNode(progress as Animated.Value<number>, {
						inputRange: [0, 1],
						outputRange: [0, 30],
					});

					return (
						<StackNavigation
							{...props}
							style={
								{
									borderRadius: borderRadiusTop,
									transform: [{ scale, rotateZ: rotate }],
								} as unknown as ViewStyle
							}
						/>
					);
				}}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	drawerStyles: { flex: 1, width: '50%', backgroundColor: 'red' },
	bgTransparent: {
		backgroundColor: 'transparent',
	},
});

export default DrawerNavigation;
