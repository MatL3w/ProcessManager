import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideStore } from '@ngrx/store';
import { dataReducer } from './app/store/data.reducer';
import { provideEffects } from '@ngrx/effects';
import { DataEffects } from './app/store/data.effects';

bootstrapApplication(AppComponent,{
  providers: [
    importProvidersFrom(AppRoutingModule),
    provideStore({
        data: dataReducer,
    }),
    provideEffects([DataEffects])
  ]
});
