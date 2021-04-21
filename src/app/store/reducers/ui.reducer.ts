/* eslint-disable no-underscore-dangle */
import { createReducer, on } from '@ngrx/store';
import { showToast } from '../actions';
import { showAlert } from '../actions/ui.actions';

export interface UiState {
    message: string;
}

export const initialState: UiState = {
   message: '',
};


const _uiReducer = createReducer(initialState,

    on(showToast, (state, {message}) => ({ ...state, message})),
    on(showAlert, (state, {message}) => ({ ...state, message})),

);

export const uiReducer = (state, action) => _uiReducer(state, action);
