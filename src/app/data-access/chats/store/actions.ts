import {createActionGroup, emptyProps, props} from '@ngrx/store';

import {Chat, ChatCreateDto, ChatMessage} from '../chats.interface';

export const chatActions = createActionGroup({
  source: 'chat',
  events: {
    /** Action для создания персонального чата пользователя по id. */
    'create personal chat': props<{ user_id: number, dto: ChatCreateDto }>(),
    /** Action успешного создания персонального чата пользователя. */
    'create chat success': props<{ chat: Chat }>(),

    /** Action для получения персонального чата пользователя по id. */
    'read personal chat': props<{ chat_id: number }>(),
    /** Action успешного получения персонального чата пользователя. */
    'read chat success': props<{ chat: Chat }>(),

    /** Action для получения всех чатов пользователя. */
    'get chats': emptyProps(),
    /** Action успешного получения всех чатов пользователя. */
    'chats loaded': props<{ chats: Chat[] }>(),

    /** Action для отправки персонального сообщения пользователю по id. */
    'send message': props<{ chat_id: number, message: string }>(),
    /** Action успешной отправки персонального сообщения пользователю. */
    'send message success': props<{ message: ChatMessage }>(),

    /** Action для получения персонального сообщения пользователя по id. */
    'get message': props<{ message_id: number }>(),
    /** Action успешного получения персонального сообщения пользователя. */
    'message loaded': props<{ message: ChatMessage }>(),

    /** Action для редактирования персонального сообщения пользователя по id. */
    'patch message': props<{ message_id: number, text: string }>(),
    /** Action успешного редактирования персонального сообщения пользователя по id. */
    'patch message success': props<{ message: ChatMessage }>(),

    /** Action для удаления персонального сообщения пользователя по id. */
    'delete message': props<{ message_id: number }>(),
    /** Action успешного удаления персонального сообщения пользователя по id. */
    'delete message success': props<{ message_id: number }>()
  }
})
