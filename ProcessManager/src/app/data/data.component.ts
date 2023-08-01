import { Component, signal, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { change } from '../store/data.actions';
import { DataInterface } from '../store/data.reducer';
import { selectProcessId } from '../store/data.selectors';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  animations: [
    trigger('pState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          'background-color': 'white',
          transform: 'translateX(100px)',
        })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(300)),
    ]),
  ],
})
export class DataComponent {
  state = 'normal';
  procesId = signal(0);
  data$!: Observable<Object>;
  data$subscription!: Subscription;

  constructor(private store: Store<{ data: {} }>) {
    this.data$ = store.select(selectProcessId);
    this.data$subscription = this.data$.subscribe((value) => {
      this.procesId.set(value as number);
      console.log(value);
    });
    this.GenerateNewProcessId();
  }

  ngOnDestroy() {
    this.data$subscription.unsubscribe();
  }

  clickChangeProcessId() {
    this.GenerateNewProcessId();
    this.state == 'normal'
      ? (this.state = 'highlighted')
      : (this.state = 'normal');
  }

  GenerateNewProcessId() {
    this.store.dispatch(
      change({ value: Number((Math.random() * 1000000).toFixed(0)) })
    );
  }
}
