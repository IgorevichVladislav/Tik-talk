import {createSelector} from '@ngrx/store';

import {commentAdapter, commentFeature} from './reducer';

const {selectAll} = commentAdapter.getSelectors();

export const selectComments = createSelector(
  commentFeature.selectComments,
  selectAll
)
