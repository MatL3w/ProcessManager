import { createSelector } from "@ngrx/store";
import { DataInterface } from "./data.reducer";

export const selectProcessId = (state: { data: {}}) => (state.data as DataInterface).processId;
export const selectDoubleProcessId = createSelector(
  selectProcessId,
  (state: number) => state * 2,
)
