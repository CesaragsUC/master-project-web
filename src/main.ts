import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
  }
  
bootstrapApplication(AppComponent, appConfig)
    .then(() => {
       
    })
    .catch((err) => console.error(err));
