import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideStore } from '@ngrx/store';
import { dataReducer } from './app/store/data.reducer';

bootstrapApplication(AppComponent,{
  providers: [importProvidersFrom(AppRoutingModule), provideStore({
    data: dataReducer,
  })]
});
