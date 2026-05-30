import {Route} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import {PostEffects, postFeature} from '@tt/data-access/post';
import {CommentEffects, commentFeature} from '@tt/data-access/comments';

export const feedRoutes: Route[] = [{
  providers: [
    provideState(postFeature),
    provideState(commentFeature),
    provideEffects(PostEffects, CommentEffects),
  ],
  path: '',
  title: 'Лента',
  loadComponent: () => import('@tt/pages/feed-page').then(m => m.FeedPageComponent)
}]
