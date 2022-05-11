import { ThunkAction } from 'redux-thunk';

export type ThunkResult<R> = ThunkAction<R, any, undefined, any>;
