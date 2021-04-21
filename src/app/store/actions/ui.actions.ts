import { createAction, props } from '@ngrx/store';

export const showToast = createAction(
  '[UI] ShowToast ',
  props<{message: string}>());

export const showAlert = createAction(
  '[UI] ShowAlert ',
  props<{message: string}>());

