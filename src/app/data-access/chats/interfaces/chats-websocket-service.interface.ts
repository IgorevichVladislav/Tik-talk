export interface ChatConnectionWebSocketParams {
  url: string;
  token: string;
  handleMessage: (message: unknown) => void;
}

export interface ChatWebsocketService {
  connect: (params: ChatConnectionWebSocketParams) => void;
  sendMessage: (message: string, chat_id: number) => void;
  disconnect: () => void;
}
