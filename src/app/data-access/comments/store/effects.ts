import {inject, Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {CommentService} from '../comment.service';
import {commentActions} from './actions';
import {postActions} from '../../post/store/actions';

@Injectable({providedIn: 'root'})

export class CommentEffects {
  private readonly commentService = inject(CommentService);
  private readonly actions$ = inject(Actions);

  /** Effect для создания комментария. Отправляет dto в commentService и после успешного создания диспатчит createCommentSuccess. */
  createComment = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(commentActions.createComment),
        switchMap(({dto}) => this.commentService.createComment(dto)),
        map(comment => commentActions.createCommentSuccess({comment}))
      );
  });

  /** Effect для перезагрузки поста после успешного создания комментария. Получает postId из созданного комментария и диспатчит getPost. */
  reloadPostAfterCommentCreated = createEffect(() => {
    return this.actions$.pipe(
      ofType(commentActions.createCommentSuccess),
      map(({comment}) => postActions.getPost({post_id: comment.postId}))
    );
  });

  /** Effect для получения одного комментария по id. */
  getComment = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(commentActions.getComment),
        switchMap(({commentId}) => this.commentService.getComment(commentId)),
        map(comment => commentActions.commentLoaded({comment}))
      );
  });

  //todo возможно нужно сделать concatMap
  /** Effect для обновления комментария. Принимает commentId и text. */
  updateComment = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(commentActions.updateComment),
        switchMap(({commentId, text}) => this.commentService.updateComment(commentId, text)
          .pipe(map(() => commentActions.updateCommentSuccess({commentId, text})))
        )
      );
  });

  /** Effect для удаления комментария по id. */
  deleteComment = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(commentActions.deleteComment),
        switchMap(({commentId}) => this.commentService.deleteComment(commentId)
          .pipe(
            map(() => commentActions.deleteCommentSuccess({commentId}))
          )),
      );
  });
}
