import {Routes} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import {LoginPageComponent} from '@tt/pages/login-page';
import {canActivateAuth} from '@tt/data-access/auth/access.guard';
import {ProfileEffects, profileFeature} from '@tt/data-access/profile';
import {SearchPageMode} from "./shared";

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('@tt/common-ui').then(m => m.LayoutComponent),
    providers: [
      provideState(profileFeature),
      provideEffects(ProfileEffects),
    ], children: [
      {
        path: '',
        title: 'Главная страница',
        redirectTo: 'profile/me',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadChildren: () => import('@tt/pages/profile-page/profileRoutes').then(m => m.profileRoutes)
      },
      {
        path: 'chats',
        loadChildren: () => import('@tt/pages/chats-page/chatsRoutes').then(m => m.chatsRoutes)
      },
      {
        path: 'search',
        title: 'Страница поиска пользователей',
        loadComponent: () => import('@tt/pages/search-page').then(m => m.SearchPageComponent),
        data: {pageMode: SearchPageMode.Search}
      },
      {
        path: 'subscribers',
        title: 'Страница поиска подписчиков пользователя',
        loadComponent: () => import('@tt/pages/search-page').then(m => m.SearchPageComponent),
        data: {pageMode: SearchPageMode.Subscribers}
      },
      {
        path: 'subscriptions',
        title: 'Страница поиска подписок пользователя',
        loadComponent: () => import('@tt/pages/search-page').then(m => m.SearchPageComponent),
        data: {pageMode: SearchPageMode.Subscriptions}
      },
      {
        path: 'feed',
        loadChildren: () => import('@tt/pages/feed-page/feedRoutes').then(m => m.feedRoutes),
      },
      {
        path: 'community',
        loadComponent: () => import('@tt/pages/community-page').then(m => m.CommunityPageComponent),
      }
    ], canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPageComponent}
];
