import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BASE_API_URL} from '@tt/tokens/base-api-url.token';
import {Chat, ChatMessage, LastChatMessage} from '../interfaces/chats.interface';
import {ChatWebsocketService} from '@tt/data-access/chats/interfaces/chats-websocket-service.interface';
import {ChatsWebsocketNativeService} from '@tt/data-access/chats/services/chats-websocket-native.service';
import {AuthService} from '@tt/data-access/auth';

@Injectable({providedIn: 'root'})

export class ChatsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly baseApiUtl = inject(BASE_API_URL);

  private readonly wsAdapter: ChatWebsocketService = new ChatsWebsocketNativeService();

  createPersonalChat(user_id: number) {
    return this.http.post<Chat>(`${this.baseApiUtl}/chat/${user_id}`, null);
  }

  readPersonalChat(chat_id: number) {
    return this.http.get<Chat>(`${this.baseApiUtl}/chat/${chat_id}`);
  }

  getChats() {
    return this.http.get<LastChatMessage[]>(`${this.baseApiUtl}/chat/get_my_chats/`);
  }

  sendMessage(chat_id: number, message: string) {
    return this.http.post<ChatMessage>(`${this.baseApiUtl}/message/send/${chat_id}`, null, {params: {message}});
  }

  getMyMessage(message_id: number) {
    return this.http.get<ChatMessage>(`${this.baseApiUtl}/message/${message_id}`);
  }

  patchMyMessage(message_id: number, text: string) {
    return this.http.patch<ChatMessage>(`${this.baseApiUtl}/message/${message_id}`, text);
  }

  deleteMyMessage(message_id: number) {
    return this.http.delete<number>(`${this.baseApiUtl}/message/${message_id}`);
  }

  //todo WebSocket

  handleWebSocketMessage(message: string) {

  }

  // connectWebSocket() {
  //   return this.wsAdapter.connect({
  //     url: `${this.baseApiUtl}/chat/ws`,
  //     token: this.authService.token ?? '',
  //     handleMessage: this.handleWebSocketMessage.bind(this),
  //   })
  // }
}
