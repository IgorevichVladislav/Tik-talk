import {Profile} from '../../profile/index';

export interface ChatWSStatusInfo {
  status: 'success' | 'error';
}

export interface ChatWSNewMessage extends ChatWSStatusInfo {
  action: 'message';
  data: {
    id: number;
    message: string;
    chat_id: number;
    createdAt: string;
    author: Profile;
  }
}

export interface ChatWSSendMessage {
  text: string;
  chat_id: number;
}

export interface ChatWSUnreadMessageCount extends ChatWSStatusInfo {
  action: 'unread';
  data: {
    count: number;
  }
}

export interface ChatWSErrorMessage extends ChatWSStatusInfo {
  message: string;
}
