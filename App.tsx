import React from 'react';
import Navigation from './src/navigation/Navigation';
import ThemeManager from './src/Themes';

const App = () => {
	return (
		<ThemeManager>
			<Navigation />
		</ThemeManager>
	);
};

export default App;
