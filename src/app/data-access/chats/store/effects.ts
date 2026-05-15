import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';

import {ChatsService} from '../chats.service';
import {chatActions} from './actions';

@Injectable({providedIn: 'root'})

export class ChatEffects {
  private readonly chatService = inject(ChatsService);
  private readonly actions$ = inject(Actions);

  /** Effect для создания персонального чата пользователя по id. Отправляет dto в chatService и после успешного создания диспатчит createChatSuccess. */
  createPersonalChat = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.createPersonalChat),
        switchMap(({user_id, dto}) => this.chatService.createPersonalChat(user_id, dto)),
        map(chat => chatActions.createChatSuccess({chat}))
      )
  });

  /** Effect для получения персонального чата по id. Запрашивает чат через chatService и после успешной загрузки диспатчит readChatSuccess. */
  readPersonalChat = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.readPersonalChat),
        switchMap(({chat_id}) => this.chatService.readPersonalChat(chat_id)),
        map(chat => chatActions.readChatSuccess({chat}))
      )
  });

  /** Effect для получения списка чатов пользователя. Запрашивает чаты через chatService и после успешной загрузки диспатчит chatsLoaded. */
  getChats = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.getChats),
        switchMap(() => this.chatService.getChats()),
        map(chats => chatActions.chatsLoaded({chats}))
      )
  });

  /** Effect для отправки сообщения в чат. Отправляет message в chatService и после успешной отправки диспатчит sendMessageSuccess. */
  sendMessage = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.sendMessage),
        switchMap(({chat_id, message}) => this.chatService.sendMessage(chat_id, message)),
        map(message => chatActions.sendMessageSuccess({message}))
      )
  });

  /** Effect для получения сообщения по id. Запрашивает сообщение через chatService и после успешной загрузки диспатчит messageLoaded. */
  getMessage = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.getMessage),
        switchMap(({message_id}) => this.chatService.getMyMessage(message_id)),
        map(message => chatActions.messageLoaded({message}))
      )
  });

  /** Effect для редактирования сообщения по id. Отправляет новый text в chatService и после успешного обновления диспатчит patchMessageSuccess. */
  patchMessage = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.patchMessage),
        switchMap(({message_id, text}) => this.chatService.patchMyMessage(message_id, text)),
        map(message => chatActions.patchMessageSuccess({message}))
      )
  });

  /** Effect для удаления сообщения по id. Удаляет сообщение через chatService и после успешного удаления диспатчит deleteMessageSuccess. */
  deleteMessage = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.deleteMessage),
        switchMap(({message_id}) => this.chatService.deleteMyMessage(message_id)
          .pipe(
            map(() => chatActions.deleteMessageSuccess({message_id}))
          )
        )
      )
  });

}
