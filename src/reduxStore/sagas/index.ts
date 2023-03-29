import { all, fork } from 'redux-saga/effects';
import * as Authen from './authen';

export default function* rootSaga() {
	yield all(
		[
			...Object.values(Authen),
			// ...Object.values(TraCuu),
			// ...Object.values(LapHoaDon),
			// ...Object.values(DKHoaDon),
			// ...Object.values(ThongTin),
			// ...Object.values(DanhMuc),
			// ...Object.values(ThongBao),
			// ...Object.values(Quanly),
		].map(fork)
	);
}
