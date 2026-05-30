import {Route} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import {ChatEffects, chatFeature} from '@tt/data-access/chats';

export const chatsRoutes: Route[] = [{
  providers: [
    provideState(chatFeature),
    provideEffects(ChatEffects)
  ],
  path: '',
  title: 'Чаты',
  loadComponent: () => import('@tt/pages/chats-page').then(m => m.ChatsPageComponent),
  children: [{
    path: ':chatId',
    title: 'Активный чат',
    loadComponent: () => import('@tt/pages/chats-page/chats-workspace').then(m => m.ChatsWorkspaceComponent),
  }]
}];
