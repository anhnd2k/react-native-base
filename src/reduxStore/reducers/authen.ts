import { DEFAULT, LOGIN_COMPLETE, CAPTCHA_COMPLETE, PROFILE_COMPLETE } from '../constants/authen';

const initialState = {
	loginResponse: undefined, // đăng nhập
	captchaResponse: undefined, // lấy captcha
	profileResponse: undefined, // lấy thông tin tài khoản
};

export default function authen(state = initialState, action: any) {
	switch (action.type) {
		case DEFAULT:
			return {
				...initialState,
			};
		// đăng nhập
		case LOGIN_COMPLETE:
			return {
				...state,
				loginResponse: action.payload,
			};
		// lấy captcha
		case CAPTCHA_COMPLETE:
			return {
				...state,
				captchaResponse: action.payload,
			};
		// lấy thông tin tài khoản
		case PROFILE_COMPLETE:
			return {
				...state,
				profileResponse: action.payload,
			};
	}
	return state;
}
