import { LOGIN_COMPLETE, PROFILE_COMPLETE } from '../constants/authen';

export const loginComplete = (payload: any) => {
	return {
		type: LOGIN_COMPLETE,
		payload,
	};
};

export const profileComplete = (payload: any) => {
	return {
		type: PROFILE_COMPLETE,
		payload,
	};
};
