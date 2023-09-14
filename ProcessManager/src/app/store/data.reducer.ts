import { createReducer,on } from "@ngrx/store";
import { change, changeName } from "./data.actions";

export interface DataInterface {
  processId: number;
}
const initialState:DataInterface = {
  processId: 0,
};

const processNameInit = 'default name';

export const dataReducer = createReducer(
  initialState,
  on(change, (state: DataInterface, action) => {
    const newState: DataInterface = {
      processId: action.value,
    };
    return newState;
  } )
);

export const processNameReducer = createReducer(
  processNameInit,
  on(changeName, (state: string, action) => {
    const newName = action.value;
    return newName;
  })
);
