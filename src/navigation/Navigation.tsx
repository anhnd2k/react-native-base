import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';
import { useThemeContext, lightTheme, darkTheme } from '../Themes';

const Navigation = () => {
	const theme = useThemeContext();

	return (
		<NavigationContainer theme={theme.mode === 'dark' ? darkTheme : lightTheme}>
			<DrawerNavigation />
		</NavigationContainer>
	);
};

export default Navigation;
