import {createSelector} from '@ngrx/store';

import {commentAdapter, commentFeature} from './reducer';

const {selectAll} = commentAdapter.getSelectors();

export const selectComments = createSelector(
  commentFeature.selectComments,
  selectAll
);

export const selectCommentByPostId = (postId: number) => createSelector(
  selectComments,
  (comments) => comments.filter(comment => comment.postId === postId)
);
