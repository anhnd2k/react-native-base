import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import sagas from './sagas';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export const configureStore = (onCompletion = () => {}) => {
	const store = createStore(
		reducer,
		{},
		compose(
			applyMiddleware(sagaMiddleware, logger)
			// applyMiddleware(sagaMiddleware)
		)
	);

	persistStore(store, null, onCompletion);

	sagaMiddleware.run(sagas);

	return store;
};
