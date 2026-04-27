import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';

import {PostService} from '../post.service';
import {postActions} from './actions';

@Injectable({providedIn: 'root'})

export class PostEffects {
  private readonly postService = inject(PostService);
  private readonly actions$ = inject(Actions);

  getPosts = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.getPosts),
        switchMap(({user_id}) => this.postService.getPosts(user_id)),
        map(posts => postActions.postsLoaded({posts}))
      )
  });

  createPost = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.createPost),
        switchMap(({dto}) => this.postService.createPost(dto)),
        map(post => postActions.createPostsSuccess({post}))
      )
  });
}
