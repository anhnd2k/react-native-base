import { takeLatest, put, all, select } from 'redux-saga/effects';
import { LOGIN_ACTION, PROFILE_ACTION } from '../constants/authen';
import { loginComplete, profileComplete } from '../actions/authen';
import { prepaidSubcriberApi } from 'src/services/api/DemoApi';
import { selectToken } from '../selectorConfig';

function* _login(action: any) {
	try {
		const res = yield prepaidSubcriberApi.getListCountry({ username: '' }).loading(true).run();
		yield put(loginComplete(res));
	} catch (e) {
		yield put(loginComplete({ success: false }));
	}
}

function* _profile() {
	try {
		const token: string = yield select(selectToken());
		yield put(profileComplete(token));
	} catch (e) {
		console.log('ff');
	}
}

export function* watchInitial() {
	yield all([takeLatest(LOGIN_ACTION, _login), takeLatest(PROFILE_ACTION, _profile)]);
}
