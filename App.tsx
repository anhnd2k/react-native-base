import React from 'react';
import LoadingPortal from 'src/components/base/LoadingPortal';
import Navigation from 'src/navigation/Navigation';
const App = () => {
	return (
		<>
			<Navigation />
			<LoadingPortal />
		</>
	);
};

export default App;
