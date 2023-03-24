import BaseApiService from 'src/services/BaseApiService';
import endpoints from './endpoints';

export type ListCountry = {
	username: string;
	password: string;
};
export type ListCountryDTO = {
	fullName: string;
	name: string;
	nationalCode: string;
};

export const prepaidSubcriberApi = {
	getListCountry: (data: ListCountry) => {
		return BaseApiService.POST<ListCountry, ListCountryDTO[]>(endpoints.v1.getListSimPrice(), data);
	},
};
