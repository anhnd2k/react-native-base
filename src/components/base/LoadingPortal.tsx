import React from 'react';
import { Animated, Keyboard, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = Record<string, never>;

type State = {
	show: boolean;
	message: string;
};

class LoadingPortal extends React.Component<Props, State> {
	showMessageTimeout: NodeJS.Timeout | null = null;
	hideLoadingTimeout: NodeJS.Timeout | null = null;
	textOpacity = new Animated.Value(0);
	static modal: LoadingPortal;
	showing = false;
	constructor(props: Props) {
		super(props);
		this.state = {
			show: false,
			message: '',
		};
		LoadingPortal.modal = this;
	}

	static show() {
		LoadingPortal.modal.show();
	}

	static hide() {
		LoadingPortal.modal.hide();
	}

	static setMessage(message: string) {
		LoadingPortal.modal.setMessage(message);
	}

	clearMessageTimeout() {
		if (this.showMessageTimeout) {
			clearTimeout(this.showMessageTimeout);
			this.showMessageTimeout = null;
		}
	}

	clearLoadingTimeout() {
		if (this.hideLoadingTimeout) {
			clearTimeout(this.hideLoadingTimeout);
			this.hideLoadingTimeout = null;
		}
	}

	show() {
		this.clearLoadingTimeout();
		if (!this.showing) {
			Keyboard.dismiss();
			this.showing = true;
			this.setState({ show: true });
			if (!this.state.message) {
				this.showMessageTimeout = setTimeout(() => {
					this.setMessage('Xin vui lòng chờ trong giây lát');
				}, 5 * 1000);
			}
		}
	}

	hide() {
		if (this.showing) {
			this.hideLoadingTimeout = setTimeout(() => {
				this.showing = false;
				this.setState({ show: false, message: '' });
				this.clearMessageTimeout();
				this.clearLoadingTimeout();
			}, 500);
		}
	}

	setMessage(message: string) {
		Animated.timing(this.textOpacity, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			this.setState({ message }, () => {
				Animated.timing(this.textOpacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}).start();
			});
		});
		this.clearMessageTimeout();
	}

	render() {
		const { show, message } = this.state;
		return (
			<>
				{show && (
					<View style={[StyleSheet.absoluteFill, styles.container]}>
						<View style={styles.placeholder} />
						<LottieView
							source={require('src/assets/json/loading.json')}
							autoPlay
							loop
							style={styles.loading}
						/>
						<Animated.View style={[styles.messageContainer, { opacity: this.textOpacity }]}>
							<Text style={styles.message}>{message}</Text>
						</Animated.View>
					</View>
				)}
			</>
		);
	}
}

export default LoadingPortal;

const styles = StyleSheet.create({
	modal: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		zIndex: 20,
	},
	placeholder: {
		height: 120,
	},
	messageContainer: {
		alignSelf: 'stretch',
		height: 120,
	},
	message: {
		color: '#FFFFFF',
		fontSize: 16,
		marginHorizontal: 24,
		textAlign: 'center',
	},
	loading: {
		width: 175,
	},
});
