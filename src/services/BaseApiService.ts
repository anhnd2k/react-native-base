import axios from 'axios';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import navigationService from 'src/navigation/navigationService';
import { navigationRoutes } from 'src/navigation/StackNavigation';
import { generateApiService } from './ApiService';

type ResponseWrapper = {
	success: boolean;
	errorCode: string;
	content: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

class ErpError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ErpError';
	}
}

const BaseApiService = generateApiService({
	baseUrl: Config.BASE_API_URL + '/api',
	fromService: 'BaseApiService',
	defaultHeader: () => ({
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}),
	onSuccess: (data: ResponseWrapper, uiConfig) => {
		if (data.success) {
			return data.content;
		} else {
			throw new ErpError(formatStringTemplate('', uiConfig.formatValues || data.content));
		}
	},
	onError: (error, uiConfig) => {
		if (uiConfig.popup) {
			if (error instanceof ErpError) {
				Alert.alert('Gửi yêu cầu thất bại.');
			} else if (error.response) {
				console.log(JSON.stringify(error.response, null, 2));
				if (error.response.status === 401) {
					// token expired
					Alert.alert('Phiên đăng nhập hết hạn');
					navigationService.reset(navigationRoutes.HOME);
				} else if (error.response.status >= 500 && error.response.status <= 599) {
					Alert.alert('Lỗi hệ thống');
				} else {
					const data = error.response.data;
					let message: string;
					if (data.errorCode === '010154' || data.errorCode === '0114033') {
						message = data.content;
						// do something
					}
					return { data };
				}
			} else {
				Alert.alert('Gửi yêu cầu thất bại');
			}
		}
		const response = error.response;
		const request = error.request;
		return { ...error, response, request };
	},

	onInterceptorApi: {
		request: {
			onFulfilled: (config) => {
				// do something
				return config;
			},
			onRejected: (err) => {
				return Promise.reject(err);
			},
		},
		response: {
			onFulfilled: (res) => {
				return res;
			},
			onRejected: async (err) => {
				const originalConfig = err.config;
				if (err.response?.status === 401 && !originalConfig?._retry) {
					originalConfig._retry = true;
					try {
						return await axios.request(originalConfig);
					} catch (_error) {
						return Promise.reject(_error);
					}
				} else {
					return Promise.reject(err);
				}
			},
		},
	},
});

export const formatStringTemplate = (template: string, values: string[]) => {
	if (Array.isArray(values)) {
		// Don't ask me why, rule of thumb: never trust data come from external sources
		const len = values.length;
		for (let i = 0; i < len; i++) {
			template = template.replace(`{${i}}`, values[i]);
		}
	}
	return template;
};

export default BaseApiService;
