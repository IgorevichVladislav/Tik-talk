import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';

import {ChatsService} from '../chats.service';
import {chatActions} from './actions';
import {StorageSearchFilterKeys, StorageType, hasStorageValue} from '@tt/shared';
import {WebStorageService} from '@tt/data-access/storage/web-storage.service';

@Injectable({providedIn: 'root'})

export class ChatEffects {
  private readonly chatService = inject(ChatsService);
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly webService = inject(WebStorageService);

  /** Effect для создания персонального чата пользователя по id. Отправляет dto в chatService и после успешного создания диспатчит createChatSuccess. */
  createPersonalChat = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.createPersonalChat),
        switchMap(({user_id}) => this.chatService.createPersonalChat(user_id)),
        map(chat => chatActions.createChatSuccess({chat}))
      )
  });

  /** Effect для перехода в созданный персональный чат после успешного создания. Новый action не диспатчит. */
  redirectAfterCreateChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatActions.createChatSuccess),
      tap(({chat}) => this.router.navigate(['/chats', chat.id]))
    )
  }, {dispatch: false});

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

  addSearchValueForStorage = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(chatActions.searchChatsFilter),
        tap(({searchValue}) => {
          const searchChatsFilterKey = StorageSearchFilterKeys.ChatSearchFilterKey;
          if (searchValue && hasStorageValue(searchValue)) {
            this.webService.setItem(searchChatsFilterKey, searchValue, StorageType.Session);
          } else {
            this.webService.removeItem(searchChatsFilterKey, StorageType.Session);
          }
        })
      )
  }, {dispatch: false});

}
