import { createSelector } from 'reselect';

const selectConfig = (state: any) => state.configs;
const selectToken = () => createSelector(selectConfig, (substate) => substate.token);

export { selectToken };
