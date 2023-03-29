import BaseApiService from 'src/services/BaseApiService';
import endpoints from './endpoints';

export type ListCountry = {
	username: string;
};
export type ListCountryDTO = {
	fullName: string;
};

export const prepaidSubcriberApi = {
	getListCountry: (data: ListCountry) => {
		return BaseApiService.POST<ListCountry, ListCountryDTO[]>(endpoints.v1.getListSimPrice(), data);
	},
};
