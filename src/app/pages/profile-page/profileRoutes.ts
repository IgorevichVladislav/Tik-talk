import {Route} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import {PostEffects, postFeature} from '@tt/data-access/post';
import {CommentEffects, commentFeature} from '@tt/data-access/comments';

export const profileRoutes: Route[] = [{
  providers: [
    provideState(postFeature),
    provideState(commentFeature),
    provideEffects(PostEffects, CommentEffects),
  ],
  path: '',
  children: [
    {
      path: ':profileId/settings',
      title: 'Настройки профиля',
      loadComponent: () => import('@tt/pages/settings-page').then(m => m.SettingsPageComponent),
    },
    {
      path: ':profileId',
      title: 'Профиль пользователя',
      loadComponent: () => import('@tt/pages/profile-page').then(m => m.ProfilePageComponent)
    }
  ]
}];
