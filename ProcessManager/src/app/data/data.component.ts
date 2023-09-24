import { Component, signal, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { change, changeName } from '../store/data.actions';
import { DataInterface } from '../store/data.reducer';
import { selectProcessId } from '../store/data.selectors';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  imports: [FormsModule, CommonModule],
  providers: [UserService, HttpClient],
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
export class DataComponent implements OnDestroy, OnInit {
  state = 'normal';
  procesId = signal(0);
  processName = signal('lol');
  processName$!: Observable<String>;
  processName$subscription!: Subscription;
  data$!: Observable<Object>;
  data$subscription!: Subscription;
  someInfo?: string;
  someRandomInfo?: string;
  inputPostTitle: string = '';
  inputPostContent: string = '';
  Posts?: { title: string; content: string }[];

  constructor(
    private store: Store<{ data: {}; processName: string }>,
    private userService: UserService,
    private http: HttpClient
  ) {
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
      changeName({ value: (Math.random() * 1000000).toFixed(0) })
    );
  }

  sendNewPost() {
    const post = {
      title: this.inputPostTitle,
      content: this.inputPostContent,
    };
    console.log('Sending request');
    this.http
      .post(
        'https://process-manager-e750a-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        post
      )
      .subscribe((response) => {
        console.log('Response: ');
        console.log(response);
      });
  }

  fetchPosts() {
        this.http
      .get < { title: string, content: string }[]>(
        'https://process-manager-e750a-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
        )
        .pipe(map(resData=> {
          const data = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              data.push({ ...resData[key] });
            }
          }
          return data;
        }))
          .subscribe(posts => {
          console.log(posts);
          this.Posts = posts;
      })
  }
}
