import { Component, signal, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { change } from '../store/data.actions';
import { DataInterface } from '../store/data.reducer';
import { selectProcessId } from '../store/data.selectors';

@Component({
  standalone: true,
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent {
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
  }

  GenerateNewProcessId() {
    this.store.dispatch(change({ value: Number((Math.random() * 1000000).toFixed(0)) }));
  }
}
