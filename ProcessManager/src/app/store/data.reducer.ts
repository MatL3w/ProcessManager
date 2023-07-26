import { createReducer,on } from "@ngrx/store";
import { change } from "./data.actions";

export interface DataInterface {
  processId: number;
}
const initialState:DataInterface = {
  processId: 0,
};

export const dataReducer = createReducer(
  initialState,
  on(change, (state: DataInterface, action) => {
    const newState: DataInterface = {
      processId: action.value,
    };
    return newState;
  } )
);
