import {createActionGroup, props} from '@ngrx/store';

import {Post, PostCreateDto} from '../post.interface';

export const postActions = createActionGroup({
  source: 'post',
  events: {

    'get posts': props<{ user_id: number }>(),
    'posts loaded': props<{ posts: Post[] }>(),

    'create post': props<{ dto: PostCreateDto }>(),
    'create posts success': props<{ post: Post }>(),
  }
})
