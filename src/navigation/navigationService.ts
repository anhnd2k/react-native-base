import {
	CommonActions,
	StackActions,
	DrawerActions,
	NavigationContainerRef,
	NavigationState,
	PartialState,
	Route,
} from '@react-navigation/native';
import { RootStackParamList } from './StackNavigation';
import { ParamListBase } from '@react-navigation/native';

type ResetState =
	| PartialState<NavigationState>
	| NavigationState
	| (Omit<NavigationState, 'routes'> & {
			routes: Omit<Route<string>, 'key'>[];
	  });

type NavigationRoute<ParamList extends ParamListBase, RouteName extends keyof ParamList> = Route<
	Extract<RouteName, string>,
	ParamList[RouteName]
> & {
	state?: NavigationState | PartialState<NavigationState>;
};

type NavigationStackState = {
	key: string;
	index: number;
	routeNames: Extract<keyof RootStackParamList, string>[];
	history?: unknown[];
	routes: NavigationRoute<RootStackParamList, keyof RootStackParamList>[];
	type: string;
	stale: true | false;
};

interface IConfig {
	navigator?: NavigationContainerRef<RootStackParamList>;
	state?: NavigationStackState;
	cleanUp?: () => void;
}

const config: IConfig = {};

export function setNavigator(nav: NavigationContainerRef<RootStackParamList>): void {
	if (config.cleanUp) {
		config.cleanUp();
	}
	config.navigator = nav;
	config.cleanUp = config.navigator?.addListener('state', (action) => {
		if (action.data.state) {
			config.state = JSON.parse(JSON.stringify(action.data.state));
		}
	});
}

function navigate(
	name: keyof RootStackParamList,
	params: RootStackParamList[typeof name] = {}
): void {
	if (config.navigator && name) {
		const route = name.split('/');
		if (route.length === 1) {
			const action = CommonActions.navigate({ name, params });
			config.navigator.dispatch(() => {
				return action;
			});
		} else {
			config.navigator.navigate(route[0] as keyof RootStackParamList, {
				screen: name,
				params,
			});
		}
	}
}

function push(name: keyof RootStackParamList, params: RootStackParamList[typeof name] = {}): void {
	if (config.navigator && name) {
		const action = StackActions.push(name, params);
		config.navigator.dispatch(action);
	}
}

// interface data {
//   name: keyof RootStackParamList;
//   params: any;
// }

// function addNewMoreScreen(data: data[]) {
//   config.navigator?.dispatch((state) => {
//     const newRoute = state.routes;

//     const routes = [...newRoute, ...data];
//     console.log("===>>>", routes);
//     // @ts-ignore
//     return CommonActions.reset({ routes });
//   });
// }

function goBack(): void {
	if (config.navigator) {
		const action = CommonActions.goBack();
		config.navigator.dispatch(action);
	}
}

function reset(state: string | ResetState): void {
	if (typeof state === 'string') {
		state = { routes: [{ name: state }] };
	}
	if (config.navigator) {
		const action = CommonActions.reset(state);
		config.navigator.dispatch(action);
	}
}

function _getPushScreenState(
	state: NavigationStackState,
	name: keyof RootStackParamList,
	params?: RootStackParamList[typeof name]
): NavigationStackState {
	const stackRoute = state.routes[0];
	const stackState = stackRoute.state;
	if (stackState) {
		const newStackChildRoutes: any[] = [...stackState.routes]; // eslint-disable-line @typescript-eslint/no-explicit-any
		newStackChildRoutes.push({
			name,
			params,
		});
		return {
			...state,
			routes: [
				{
					...stackRoute,
					state: {
						...stackState,
						index: newStackChildRoutes.length - 1,
						routes: newStackChildRoutes,
					},
				},
			],
			stale: false,
		};
	}
	return {
		...state,
		stale: false,
	};
}

function _getBackToScreenState(
	state: NavigationStackState,
	name: keyof RootStackParamList
): NavigationStackState {
	const stackRoute = state.routes[0];
	const stackState = stackRoute.state;
	if (stackState) {
		const newStackChildRoutes: any = []; // eslint-disable-line @typescript-eslint/no-explicit-any
		const currentStackRoutesLength = stackState.routes.length;
		for (let i = 0; i < currentStackRoutesLength; i++) {
			const route = stackState.routes[i];
			newStackChildRoutes.push(route);
			if (route.name === name) {
				break;
			}
		}
		return {
			...state,
			routes: [
				{
					...stackRoute,
					state: {
						...stackState,
						index: newStackChildRoutes.length - 1,
						routes: newStackChildRoutes,
					},
				},
			],
			stale: false,
		};
	}
	return {
		...state,
		stale: false,
	};
}

function backToScreen(name: keyof RootStackParamList) {
	if (config.navigator && name) {
		config.navigator.dispatch((_state) => {
			const state = _getBackToScreenState(JSON.parse(JSON.stringify(config.state)), name);
			if (state) {
				return CommonActions.reset(state as ResetState);
			} else {
				return CommonActions.reset(_state);
			}
		});
	}
}

function backToScreenThenPush({
	backTo,
	pushTo,
	pushParams,
}: {
	backTo: keyof RootStackParamList;
	pushTo: keyof RootStackParamList;
	pushParams?: RootStackParamList[typeof pushTo];
}) {
	if (config.navigator && backTo && pushTo) {
		config.navigator.dispatch((_state) => {
			const backToScreenState = _getBackToScreenState(
				JSON.parse(JSON.stringify(config.state)),
				backTo
			);
			const pushToScreenState = _getPushScreenState(backToScreenState, pushTo, pushParams);
			if (pushToScreenState) {
				return CommonActions.reset(pushToScreenState as ResetState);
			} else {
				return CommonActions.reset(_state);
			}
		});
	}
}

function toggleDrawer(): void {
	config.navigator?.dispatch(DrawerActions.toggleDrawer());
}

function canGoBack(): boolean {
	return config.navigator?.canGoBack() || false;
}

function getCurrentRouteName(): string {
	return config.navigator?.getCurrentRoute()?.name || '';
}

function onStateChanged(cb: () => void): (() => void) | undefined {
	return config.navigator?.addListener('state', cb);
}

const navigationService = {
	navigate,
	push,
	goBack,
	reset,
	backToScreenThenPush,
	backToScreen,
	toggleDrawer,
	canGoBack,
	getCurrentRouteName,
	onStateChanged,
};

export default navigationService;
