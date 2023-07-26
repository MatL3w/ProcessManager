import { createAction, props } from "@ngrx/store";

export const change = createAction(
  '[data] changeProcessId',
  props<{ value: number }>(),
);
