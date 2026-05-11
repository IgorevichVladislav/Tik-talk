import {createFeature, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

import {PostComment} from '../comment.interface';
import {commentActions} from './actions';
import {postActions} from '@tt/data-access/post/store';

export const commentAdapter = createEntityAdapter<PostComment>({
  selectId: postComment => postComment.id,
  sortComparer: (a, b) => b.id - a.id
})

export interface PostCommentState {
  comment: PostComment | null;
  comments: EntityState<PostComment>;
}

export const commentInitialState: PostCommentState = {
  comment: null,
  comments: commentAdapter.getInitialState()
}

export const commentFeature = createFeature({
  name: 'commentFeature',
  reducer: createReducer(
    commentInitialState,

    on(commentActions.createCommentSuccess, (state, {comment}) => {
      return {
        ...state,
        comments: commentAdapter.addOne(comment, state.comments)
      }
    }),

    on(commentActions.commentLoaded, (state, {comment}) => {
      return {
        ...state,
        comments: commentAdapter.setOne(comment, state.comments)
      }
    }),

    /** Получаем в comment state комментарии из post */
    on(postActions.postsLoaded, (state, {posts}) => {
      const comments = posts.flatMap(post => post.comments ?? []);

      return {
        ...state,
        comments: commentAdapter.setAll(comments, state.comments)
      }
    }),


    on(commentActions.updateCommentSuccess, (state, {commentId, text}) => {
      return {
        ...state,
        comments: commentAdapter.updateOne(
          {
            id: commentId,
            changes: {text}
          },
          state.comments
        ),
      }
    }),

    on(commentActions.deleteCommentSuccess, (state, {commentId}) => {
      return {
        ...state,
        comments: commentAdapter.removeOne(commentId, state.comments)
      }
    })
  )
})
