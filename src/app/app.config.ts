import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';

interface NgxSpinnerConfig {
  type?: string;
}

export const appConfig: ApplicationConfig = {
  providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(), // https://angular.dev/api/common/http/provideHttpClient?tab=description
     provideAnimationsAsync(),
     importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }))
    ]
};