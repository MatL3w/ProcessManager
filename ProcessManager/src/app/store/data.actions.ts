import { createAction, props } from "@ngrx/store";

export const change = createAction(
  '[data] changeProcessId',
  props<{ value: number }>(),
);

export const changeName = createAction(
  '[processName] changeProcessName',
  props<{ value: string }>(),
);
