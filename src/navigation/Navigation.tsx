import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';

export class Navigation extends Component {
	render() {
		return (
			<NavigationContainer>
				<DrawerNavigation />
			</NavigationContainer>
		);
	}
}

export default Navigation;
