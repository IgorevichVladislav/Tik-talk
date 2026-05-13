import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, exhaustMap, map, switchMap} from 'rxjs';

import {PostService} from '../post.service';
import {postActions} from './actions';

@Injectable({providedIn: 'root'})

export class PostEffects {
  private readonly postService = inject(PostService);
  private readonly actions$ = inject(Actions);

  /** Effect для загрузки всех постов пользователя. */
  getPosts = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.getPosts),
        switchMap(({user_id}) => this.postService.getPosts(user_id)),
        map(posts => postActions.postsLoaded({posts}))
      )
  });

  /** Effect для создания поста пользователя. */
  createPost = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.createPost),
        switchMap(({dto}) => this.postService.createPost(dto)),
        map(post => postActions.createPostSuccess({post}))
      )
  });

  submitPost = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.submitPost),
        concatMap(({dto, image}) => this.postService.createPost(dto)
          .pipe(
            concatMap(post => {
              if (!image) {
                return [
                  postActions.createPostSuccess({post}),
                ]
              }

              return [
                postActions.createPostSuccess({post}),
                postActions.loadImage({post_id: post.id, image})
              ]
            })
          ))
      )
  });

  /** Effect для загрузки одного поста пользователя по id. */
  getPost = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.getPost),
        switchMap(({post_id}) => this.postService.getPost(post_id)),
        map(post => postActions.postLoaded({post}))
      )
  });

  /** Effect для обновления одного поста пользователя по id. */
  updatePost = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.updatePost),
        concatMap(({post_id, updateDto}) => this.postService.updatePost(post_id, updateDto)),
        map(post => postActions.updatePostSuccess({post}))
      )
  });

  /** Effect для удаления одного поста пользователя по id. */
  deletePost = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.deletePost),
        switchMap(({post_id}) => this.postService.deletePost(post_id)
          .pipe(map(() => postActions.deletePostSuccess({post_id})))),
      )
  });

  loadImage = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.loadImage),
        switchMap(({post_id, image}) => this.postService.loadImage(post_id, image)),
        map(post => postActions.loadImageSuccess({post}))
      )
  });

  deleteImage = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.deleteImage),
        switchMap(({post_id, image_url}) => this.postService.deleteImage(post_id, image_url)),
        map(post => postActions.deleteImageSuccess({post}))
      )
  });

  /** Effect для постановки лайка пользователя на пост. */
  createLike = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.createLike),
        exhaustMap(({post_id}) => this.postService.createLike(post_id)
          .pipe(map(() => postActions.getPost({post_id})))
        ))

  });

  /** Effect для удаления лайка пользователя с поста. */
  deleteLike = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(postActions.deleteLike),
        exhaustMap(({post_id}) => this.postService.deleteLike(post_id)
          .pipe(map(() => postActions.getPost({post_id})))
        ))
  });

}
