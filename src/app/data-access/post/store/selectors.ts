import {createSelector} from '@ngrx/store';

import {postAdapter, postFeature} from './reducer';

const {selectAll} = postAdapter.getSelectors();

export const selectPosts = createSelector(
  postFeature.selectPosts,
  selectAll
)

export const selectCreatePost = createSelector(
  postFeature.selectPost,
  (post) => post
)

export const selectPost = createSelector(
  postFeature.selectPost,
  (post) => post
)
