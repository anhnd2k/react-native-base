import * as React from 'react';
import { StyleSheet, SafeAreaView, View, Modal, Text, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Svgs from 'src/constants/Svgs';

const NetworkStatus = (): React.ReactElement => {
	const [connected, setConnected] = React.useState<boolean>(true);
	React.useEffect(() => {
		const onConnected = () => {
			setConnected(true);
		};
		const onDisconnected = () => {
			setConnected(false);
		};
		const unsubscribe = NetInfo.addEventListener((state) => {
			if (state.isConnected) {
				onConnected();
			} else {
				onDisconnected();
			}
		});

		return unsubscribe;
	}, []);

	return (
		<SafeAreaView>
			<Modal animationType="fade" transparent statusBarTranslucent visible={!connected}>
				<View style={styles.main}>
					<View style={styles.content}>
						<View style={styles.image}>{/* <Svgs.ErrorConnect width={112} height={91} /> */}</View>
						<Text style={styles.txtLostConnect}>Đã mất kết nối!</Text>
						<Text style={styles.txtCheck}>Vui lòng kiểm tra đường truyền Internet</Text>

						{/* <Button
							style={tw('my-24')}
							rounded
							color="#EE0033"
							minWidth
							onPress={() => setConnected(true)}
							children="Tắt"
						/> */}
						<TouchableOpacity onPress={() => setConnected(true)}>
							<Text>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default NetworkStatus;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		alignItems: 'center',
	},
	content: {
		width: '80%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderRadius: 15,
		zIndex: 2,
	},
	image: {
		marginTop: 25,
		marginBottom: 30,
	},
	txtLostConnect: {
		color: '#000',
		fontSize: 18,
	},
	txtCheck: {
		fontSize: 14,
		color: '#707070',
		marginTop: 8,
		marginBottom: 16,
	},
	btnOk: {
		marginTop: 24,
		marginBottom: 24,
	},

	text: {
		fontSize: 14,
		// fontFamily: fonts.regular,
		// color: colors.white,
		textAlign: 'center',
		marginTop: 4,
		marginBottom: 4,
		paddingVertical: 3,
	},
	connected: {
		// backgroundColor: colors.color_00A357,
	},
	disconnected: {
		// backgroundColor: colors.color_929295,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
});
