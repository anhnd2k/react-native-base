import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

// import configs from './configs';
import authen from './authen';
// import tracuu from './tracuu';
// import laphoadon from './laphoadon';
// import dkhoadon from './dkhoadon';
// import thongtin from './thongtin';
// import danhmuc from './danhmuc';
// import thongbao from './thongbao';
// import quanly from './quanly';
// import mgTracuu from './mgTracuu';

const keyConfig = {
	key: 'rootStorage',
	storage: AsyncStorage,
};

export default combineReducers({
	// configs: persistReducer(keyConfig, configs),
	authen,
	// tracuu,
	// laphoadon,
	// dkhoadon,
	// thongtin,
	// danhmuc,
	// thongbao,
	// quanly,
	// mgTracuu,
});
