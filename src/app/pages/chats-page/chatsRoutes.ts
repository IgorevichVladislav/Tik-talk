import {Route} from '@angular/router';

export const chatsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@tt/pages/chats-page').then(m => m.ChatsPageComponent),
    children: [{
      path: ':chatId',
      loadComponent: () => import('@tt/pages/chats-page/chats-workspace').then(m => m.ChatsWorkspaceComponent),
    }]
  }
]
