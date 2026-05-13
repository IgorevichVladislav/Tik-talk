import {createActionGroup, emptyProps, props} from '@ngrx/store';

import {Post, PostCreateDto} from '../post.interface';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    /** Action для получения всех постов пользователя по id. */
    'get posts': props<{ user_id: number }>(),
    /** Action успешного получения всех постов пользователя. */
    'posts loaded': props<{ posts: Post[] }>(),

    /** Action для создания поста пользователя. */
    'create post': props<{ dto: PostCreateDto }>(),
    /** Action успешного создания поста пользователя. */
    'create post success': props<{ post: Post }>(),

    'submit post': props<{ dto: PostCreateDto, image: File | null }>(),

    /** Action для получения постов подписчиков пользователя. */
    'get my subscriptions post': emptyProps(),
    /** Action успешного получения постов подписчиков пользователя. */
    'subscriptions post loaded': props<{ subscriptionsPosts: Post[] }>(),

    /** Action для обновления поста пользователя по id. */
    'get post': props<{ post_id: number }>(),
    /** Action успешного обновления поста пользователя. */
    'post loaded': props<{ post: Post }>(),

    /** Action для обновления поста пользователя по id. */
    'update post': props<{ post_id: number, updateDto: Pick<PostCreateDto, 'title' | 'content'> }>(),
    /** Action успешного обновления поста пользователя. */
    'update post success': props<{ post: Post }>(),

    /** Action для удаления поста пользователя по id. */
    'delete post': props<{ post_id: number }>(),
    /** Action успешного удаления поста пользователя. */
    'delete post success': props<{ post_id: number }>(),

    /** Action для загрузки изображения в пост пользователя. */
    'load image': props<{ post_id: number, image: File }>(),
    /** Action успешной загрузки изображения в пост пользователя. */
    'load image success': props<{ post: Post }>(),

    /** Action для удаления изображения из поста пользователя. */
    'delete image': props<{ post_id: number, image_url: string }>(),
    /** Action успешного удаления изображения из поста пользователя. */
    'delete image success': props<{ post: Post }>(),

    /** Action для постановки лайка на пост пользователя. */
    'create like': props<{ post_id: number }>(),

    /** Action для снятия лайка с поста пользователя. */
    'delete like': props<{ post_id: number }>(),
  }
})
