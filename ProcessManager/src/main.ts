import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideStore } from '@ngrx/store';
import { dataReducer, processNameReducer } from './app/store/data.reducer';
import { provideEffects } from '@ngrx/effects';
import { DataEffects } from './app/store/data.effects';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([AppRoutingModule,BrowserModule,BrowserAnimationsModule]),
    provideStore({
      data: dataReducer,
      processName: processNameReducer,
    }),
    provideEffects([DataEffects]),
    provideHttpClient(),
  ],
});
