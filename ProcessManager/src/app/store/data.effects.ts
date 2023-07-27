import { Actions, createEffect, ofType } from "@ngrx/effects";
import { change } from "./data.actions";
import { tap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { DataInterface } from "./data.reducer";

@Injectable()
export class DataEffects {
  savprocessIdChange = createEffect(() => this.actions.pipe(
    ofType(change),
    withLatestFrom(this.store.select('data')),
    tap(([action,data]) => {
      console.log(action);
      console.log(data);
    })
  ),
  { dispatch: false });

  constructor(private actions: Actions, private store:Store<{data:DataInterface}>) {

  }
}
