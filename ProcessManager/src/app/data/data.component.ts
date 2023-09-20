import { Component, signal, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { change, changeName } from '../store/data.actions';
import { DataInterface } from '../store/data.reducer';
import { selectProcessId } from '../store/data.selectors';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from './data.service';

@Component({
  standalone: true,
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [UserService],
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
      transition('normal => highlighted', animate(100)),
      transition('highlighted => normal', animate(100)),
    ]),
  ],
})
export class DataComponent implements OnDestroy, OnInit{
  state = 'normal';
  procesId = signal(0);
  processName = signal('lol');
  processName$!: Observable<String>;
  processName$subscription!: Subscription;
  data$!: Observable<Object>;
  data$subscription!: Subscription;
  someInfo?: string;
  someRandomInfo?: string;

  constructor(private store: Store<{ data: {}, processName: string }>, private userService: UserService) {
    this.data$ = store.select(selectProcessId);
    this.data$subscription = this.data$.subscribe((value) => {
      this.procesId.set(value as number);
      console.log(value);
    });
    this.processName$ = store.select('processName');
    this.processName$subscription = this.processName$.subscribe((value) => {
      this.processName.set(value as string);
      console.log(value);
    });
    this.GenerateNewProcessId();
  }

  ngOnInit() {
    this.someInfo = this.userService.getFirstInfo();
    this.userService.getAsynRandomData().then((data) => {
      this.someRandomInfo = data;
    });
  }

  ngOnDestroy() {
    this.data$subscription.unsubscribe();
  }

  clickChangeProcessId() {
    this.GenerateNewProcessId();
    this.state == 'normal'
      ? (this.state = 'highlighted')
      : (this.state = 'normal');
    // console.log(this.store.select('processName'));
  }

  GenerateNewProcessId() {
    this.store.dispatch(
      change({ value: Number((Math.random() * 1000000).toFixed(0)) })
    );
    this.store.dispatch(
      changeName({ value: ((Math.random() * 1000000).toFixed(0)) })
    );
  }
}
