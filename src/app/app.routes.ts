import {Routes} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import {LoginPageComponent} from '@tt/pages/login-page';
import {canActivateAuth} from '@tt/data-access/auth/access.guard';
import {ProfileEffects, profileFeature} from '@tt/data-access/profile';
import {SearchPageMode} from '@tt/data-access/shared/interface/search-page-mode.interface';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('@tt/common-ui').then(m => m.LayoutComponent),
    providers: [
      provideState(profileFeature),
      provideEffects(ProfileEffects)
    ], children: [
      {
        path: '',
        redirectTo: 'profile/me',
        pathMatch: 'full',
      },
      {
        path: 'profile/:profileId',
        loadComponent: () => import('@tt/pages/profile-page').then(m => m.ProfilePageComponent),
      },
      {
        path: 'profile/:profileId/settings',
        loadComponent: () => import('@tt/pages/settings-page').then(m => m.SettingsPageComponent),
      },
      {
        path: 'chats',
        loadComponent: () => import('@tt/pages/chats-page').then(m => m.ChatsPageComponent),
      },
      {
        path: 'search',
        loadComponent: () => import('@tt/pages/search-page').then(m => m.SearchPageComponent),
      },
      {
        path: 'subscribers',
        loadComponent: () => import('@tt/pages/search-page').then(m => m.SearchPageComponent),
        data: {pageMode: 'subscribers' as SearchPageMode}
      },
      {
        path: 'subscriptions',
        loadComponent: () => import('@tt/pages/search-page').then(m => m.SearchPageComponent),
        data: {pageMode: 'subscriptions' as SearchPageMode}
      },
      {
        path: 'community',
        loadComponent: () => import('@tt/pages/community-page').then(m => m.CommunityPageComponent),
      }
    ], canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPageComponent}
];
