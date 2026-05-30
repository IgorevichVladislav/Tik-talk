import {Injectable} from '@angular/core';
import {
  ChatConnectionWebSocketParams,
  ChatWebsocketService
} from '@tt/data-access/chats/interfaces/chats-websocket-service.interface';

@Injectable({providedIn: 'root'})

export class ChatsWebsocketNativeService implements ChatWebsocketService {
  private socket: WebSocket | null = null;

  connect(params: ChatConnectionWebSocketParams) {
    if (this.socket) return;

    this.socket = new WebSocket(params.url, params.token);

    this.socket.onmessage = (event: MessageEvent) => {
      params.handleMessage(JSON.parse(event.data));
    }

    this.socket.onclose = () => {
      console.log('Соеденение закрыто.');
    }
  };

  sendMessage(message: string, chat_id: number) {
    this.socket?.send(JSON.stringify({message, chat_id}));
  }

  disconnect() {
    this.socket?.close();
  };
}
