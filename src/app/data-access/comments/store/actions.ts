import {createActionGroup, props} from '@ngrx/store';

import {CommentCreateDto, PostComment} from '../comment.interface';

export const commentActions = createActionGroup({
  source: 'comment',
  events: {
    /** Action для создания комментария */
    'create comment': props<{ dto: CommentCreateDto }>(),
    /** Action успешного создания комментария */
    'create comment success': props<{ comment: PostComment }>(),

    /** Action для получения одного комментария по id. */
    'get comment': props<{ commentId: number }>(),
    /** Action успешной загрузки одного комментария. */
    'comment loaded': props<{ comment: PostComment }>(),

    /** Action для обновления текста комментария. */
    'update comment': props<{ commentId: number; text: string }>(),
    /** Action успешного обновления текста комментария. */
    'update comment success': props<{ commentId: number; text: string }>(),

    /** Action для удаления комментария. */
    'delete comment': props<{ commentId: number }>(),
    /** Action успешного удаления комментария. */
    'delete comment success': props<{ commentId: number }>(),
  }
})
