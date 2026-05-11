import {createFeature, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

import {Post} from '../post.interface';
import {postActions} from './actions';

export const postAdapter = createEntityAdapter<Post>({
  selectId: post => post.id,
  sortComparer: (a, b) => b.id - a.id
})

export interface PostState {
  post: Post | null;
  posts: EntityState<Post>
}

export const postInitialState: PostState = {
  post: null,
  posts: postAdapter.getInitialState()
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    postInitialState,

    on(postActions.postsLoaded, (state, {posts}) => {
      return {
        ...state,
        posts: postAdapter.setAll(posts, state.posts),
      }
    }),

    on(postActions.createPostSuccess, (state, {post}) => {
      return {
        ...state,
        posts: postAdapter.addOne(post, state.posts)
      }
    }),

    on(postActions.postLoaded, (state, {post}) => {
      return {
        ...state,
        posts: postAdapter.upsertOne(post, state.posts)
      }
    }),

    on(postActions.deletePostSuccess, (state, {post_id}) => {
      return {
        ...state,
        posts: postAdapter.removeOne(post_id, state.posts)
      }
    }),

  )
})
