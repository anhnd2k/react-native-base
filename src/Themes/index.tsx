import React, { createContext, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Appearance, AppearanceProvider } from 'react-native-appearance';

import lightTheme, { LightType } from './Light';
import darkTheme, { DarkType } from './Dark';
import { Theme } from '@react-navigation/native';

const defaultMode = Appearance.getColorScheme() || 'light';

export type extendTheme = Theme & DarkType & LightType;

const ThemeContext = createContext({
	mode: defaultMode,
	setMode: (mode) => console.log(mode),
});

const useThemeContext = () => React.useContext(ThemeContext);

const ManageThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [themeState, setThemeState] = useState(defaultMode);
	const setMode = (mode) => {
		setThemeState(mode);
	};
	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setThemeState(colorScheme);
		});
		return () => subscription.remove();
	}, []);
	return (
		<ThemeContext.Provider value={{ mode: themeState, setMode }}>
			<ThemeProvider theme={themeState === 'dark' ? darkTheme : lightTheme}>
				<>
					<StatusBar barStyle={themeState === 'light' ? 'dark-content' : 'light-content'} />
					{children}
				</>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

const ThemeManager = ({ children }: { children: React.ReactNode }) => (
	<AppearanceProvider>
		<ManageThemeProvider>{children}</ManageThemeProvider>
	</AppearanceProvider>
);

export { useThemeContext, lightTheme, darkTheme };

export default ThemeManager;
