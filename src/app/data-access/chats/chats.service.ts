import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BASE_API_URL} from '@tt/tokens/base-api-url.token';
import {Chat, ChatCreateDto, ChatMessage} from './chats.interface';

@Injectable({providedIn: 'root'})

export class ChatsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseApiUtl = inject(BASE_API_URL);

  createPersonalChat(user_id: number, dto: ChatCreateDto) {
    return this.http.post<Chat>(`${this.baseApiUtl}/chat/${user_id}`, dto);
  }

  readPersonalChat(chat_id: number) {
    return this.http.get<Chat>(`${this.baseApiUtl}/chat/${chat_id}`);
  }

  getChats() {
    return this.http.get<Chat[]>(`${this.baseApiUtl}/chat/get_my_chats/`);
  }

  sendMessage(chat_id: number, message: string) {
    return this.http.post<ChatMessage>(`${this.baseApiUtl}/message/send/${chat_id}`, message);
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
}
