import {Profile} from '../../profile/profile.interface';

export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: ChatMessage[] | null;
  companion: Profile;
}

export interface LastChatMessage {
  id: number;
  userFrom: Profile;
  message: string;
  createdAt: string;
  unreadMessages: number;
}

export interface ChatMessage {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string | null;
  user: Profile;
  isMySide?: boolean;
}
