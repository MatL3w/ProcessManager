import {TestBed, async } from '@angular/core/testing'
import { DataComponent } from './data.component';
import { StoreModule } from '@ngrx/store';
import { UserService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('Component: Data', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataComponent,
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  })

  it('should create the app',()=> {
    let fixture = TestBed.createComponent(DataComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })

  it('using info from service', () => {
    let fixture = TestBed.createComponent(DataComponent);
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.getFirstInfo()).toEqual(app.someInfo);
  })

  it('dataComponent have initialized Observables', () => {
    let fixture = TestBed.createComponent(DataComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.processName$).toBeDefined();;
  });

  it('dataComponent async task', async () => {
    let fixture = TestBed.createComponent(DataComponent);
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    let spy = spyOn(userService, 'getAsynRandomData').and.returnValue(
      Promise.resolve('Random data: asdadsasdasd')
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.someRandomInfo).toBeDefined();
    });

  });


});
