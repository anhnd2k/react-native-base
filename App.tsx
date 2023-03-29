import React from 'react';
import LoadingPortal from 'src/components/base/LoadingPortal';
import Navigation from 'src/navigation/Navigation';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { Alert, Appearance } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from 'src/reduxStore';

const errorHandler = (e, isFatal) => {
	if (isFatal) {
		Alert.alert('Notify', 'Ops! Crashed App', [{ text: 'Okey-dokeys' }]);
	} else {
		console.log(e);
	}
};

setJSExceptionHandler(errorHandler, !__DEV__);

setNativeExceptionHandler((errorString) => {
	Alert.alert('Notify', 'Ops! Crashed App', [{ text: 'Okey-dokeys' }]);
});

const App = () => {
	const _store = configureStore();
	const scheme = Appearance.getColorScheme();
	const barStyle = scheme === 'dark' ? 'light-content' : 'dark-content';
	return (
		<>
			<Provider store={_store}>
				<Navigation />
			</Provider>
			<LoadingPortal />
		</>
	);
};

export default App;
