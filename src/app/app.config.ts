import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {routes} from './app.routes';

import {BASE_API_URL} from '@tt/tokens/base-api-url.token';
import {authIntersector} from '@tt/data-access/auth/auth.interseptor';
import {profileFeature} from '@tt/data-access/profile/store/reducer';
import {ProfileEffects} from '@tt/data-access/profile/store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authIntersector])),
    provideStore(),
    provideEffects(),
    {provide: BASE_API_URL, useValue: 'https://icherniakov.ru/yt-course'},
  ]
};
