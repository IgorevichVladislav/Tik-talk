import {Routes} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import {LoginPageComponent} from '@tt/pages/login-page';
import {canActivateAuth} from '@tt/data-access/auth/access.guard';
import {ProfileEffects, profileFeature} from '@tt/data-access/profile';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('@tt/common-ui').then(m => m.LayoutComponent), children: [
      {
        path: 'search',
        loadComponent: () => import('@tt/pages/search-page').then(m => m.SearchPageComponent),
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'profile/:profileId',
        loadComponent: () => import('@tt/pages/profile-page').then(m => m.ProfilePageComponent),
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
    ], canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPageComponent}
];
